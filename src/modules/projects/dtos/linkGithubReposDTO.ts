export interface IInputLinkGithubReposDTO {
  project_id: string;
  username: string;
}

export interface IOutputLinkGithubReposDTO {
  project_id: string;
  username: string;
  repositories: {
    id: string;
    github_id: number;
    name: string;
    full_name: string;
    description?: string;
    html_url: string;
    clone_url: string;
    language?: string;
    stargazers_count: number;
    forks_count: number;
    created_at: Date;
    updated_at: Date;
  }[];
}
