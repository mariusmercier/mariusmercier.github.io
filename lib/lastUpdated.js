import { execSync } from 'child_process';

function getLastUpdated() {
  try {
    return execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim();
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export default getLastUpdated;
