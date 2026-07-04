import 'dotenv/config';
import {
  printBootstrapResults,
  printBootstrapSkipMessage,
  runAllChecks,
} from './src/shared/observability';

async function main() {
  const skipConnectivity =
    process.env.BOOTSTRAP_SKIP_CONNECTIVITY === 'true' ||
    process.env.BOOTSTRAP_SKIP_CONNECTIVITY === '1';

  if (skipConnectivity) {
    printBootstrapSkipMessage();
    process.exit(0);
  }

  const payload = await runAllChecks({ skipConnectivity: false });
  const ok = printBootstrapResults(payload);
  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
