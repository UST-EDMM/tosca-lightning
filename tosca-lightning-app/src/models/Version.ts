export interface Version {
  componentVersion: string;
  wineryVersion: number;
  workInProgressVersion: number;
  currentVersion: boolean;
  latestVersion: boolean;
  releasable: boolean;
  editable: boolean;
}
