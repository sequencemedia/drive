import nconf from 'nconf'

import {
  randomUUID
} from 'node:crypto'

import getKeyFile, {
  KEY_FILE_JSON,
  KEY_FILE_PATH
} from '#common/getKeyFile'

import createInDrive from '@sequencemedia/drive/create'

const driveId = nconf.argv().env().get('drive-id')

getKeyFile(KEY_FILE_JSON, KEY_FILE_PATH)
  .then((keyFile) => createInDrive(driveId, randomUUID() + '.json', Buffer.from('{"hello":"world"}'), keyFile))
  .then(console.log)
  .catch(console.error)
