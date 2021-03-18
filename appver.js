/* eslint-disable prettier/prettier */
const fileSystem = require('fs');

const findParam = (param) => {
  // eslint-disable-next-line no-console
  console.log(`step: find param ${param}.`);
  const optionIndex = process.argv.indexOf(param);
  if (optionIndex !== -1) {
    return process.argv[optionIndex + 1];
  } else {
    console.error(`param ${param} not found. use -h`);
    return null;
  }
};

if (process.argv.indexOf('-h') !== -1) {
  // eslint-disable-next-line no-console
  console.log(`
      appVer 1.0

      help:
      -f : Read json file path. default: undefined
      -k : Version key name. default: "version"
      -h : Help
  `);
} else {
  const target = findParam('-f');

  if (target) {
    fileSystem.readFile(target, 'utf8', function(error, data) {
      // eslint-disable-next-line no-console
      console.log(`step: read ${target}.`);

      if (!error) {

        let ver = 'version';

        if (process.argv.indexOf('-k') !== -1) {
          ver = findParam('-k');
        }

        try {
          const lines = data.split('\n');
          const version = lines.find((item) => item.indexOf(ver) !== -1);

          // eslint-disable-next-line no-console
          console.log(`step: find key ${ver}.`);
          if (version) {
            const versionNumber = version.split(': ')[1].replace(/['",]+/g, '');

            const numbers = versionNumber.split('.').map(item => parseInt(item));

            // eslint-disable-next-line no-multi-assign
            numbers[2] = numbers[2] += 10;

            if (numbers[2] === 100) {
              numbers[2] = 0;
              numbers[1] += 1;
            }

            if (numbers[1] === 10) {
              // eslint-disable-next-line no-multi-assign
              numbers[0] = numbers[0] += 1;
              numbers[1] = 0;
              numbers[2] = 0;
            }

            const result = `${numbers[0]}.${numbers[1]}.${numbers[2]}`;

            const newData = data.replace(versionNumber, result);
            // eslint-disable-next-line no-console
            console.log(`step: updated version.`);

            fileSystem.writeFile(target, newData, (err) => {
              // eslint-disable-next-line no-console
              console.log(`step: write version to ${target}.`);
              if (err) {
                console.error(err);
              } else {
                // eslint-disable-next-line no-console
                console.log(`success: version ${versionNumber} => ${result} updated.`);
              }
            });
          } else {
            // eslint-disable-next-line no-console
            console.log(`not found key "${ver}"`);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        console.error(error);
      }

    });
  }
}
