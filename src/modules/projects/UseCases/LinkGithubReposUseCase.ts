import { inject, injectable } from "tsyringe";
import axios from "axios";
import { IInputLinkGithubReposDTO, IOutputLinkGithubReposDTO } from "@modules/projects/dtos/linkGithubReposDTO";
import { NotFoundError, BadRequestError } from "@utils/AppError";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";
import { IRepositoriesRepository } from "@modules/projects/IRepositoriesRepository";

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

@injectable()
export class LinkGithubReposUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
    @inject("RepositoriesRepository")
    private repositoriesRepository: IRepositoriesRepository,
  ) {}

  async execute({ project_id, username }: IInputLinkGithubReposDTO): Promise<IOutputLinkGithubReposDTO> {
    const project = await this.projectsRepository.findById(project_id);
    if (!project) {
      throw new NotFoundError("Project not found");
    }

    if (!username) {
      throw new BadRequestError("GitHub username is required");
    }

    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
      const githubRepos: GitHubRepository[] = response.data;

      const savedRepositories = [];

      for (const repo of githubRepos) {
        const existingRepo = await this.repositoriesRepository.findBy({ github_id: repo.id });

        if (!existingRepo) {
          const newRepo = await this.repositoriesRepository.create({
            project_id,
            github_id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description || undefined,
            html_url: repo.html_url,
            clone_url: repo.clone_url,
            language: repo.language || undefined,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
          });
          savedRepositories.push(newRepo);
        }
      }

      return {
        project_id,
        username,
        repositories: savedRepositories,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new NotFoundError("GitHub user not found");
        }
        throw new BadRequestError("Error fetching GitHub repositories");
      }

      throw new BadRequestError("Error processing GitHub repositories");
    }
  }
}
