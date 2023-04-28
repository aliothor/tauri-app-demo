import { execSync } from "child_process";

const tagString = "0.0.9";

try {
  execSync(`git tag -d v${tagString}`);
} catch (error) {}

try {
  execSync(`git push origin --delete tag v${tagString}`);
} catch (error) {}
