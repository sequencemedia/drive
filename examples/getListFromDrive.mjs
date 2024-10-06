import nconf from 'nconf'

import getKeyFile, {
  KEY_FILE_JSON,
  KEY_FILE_PATH
} from '#common/getKeyFile'

import getListFromDrive from '@sequencemedia/drive/get-list'

const driveId = nconf.argv().env().get('drive-id')

getKeyFile(KEY_FILE_JSON, KEY_FILE_PATH)
  .then((keyFile) => getListFromDrive(driveId, keyFile))
  .then(console.log)
  .catch(console.error)
