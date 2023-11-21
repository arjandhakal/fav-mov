import * as crypto from 'crypto'
import * as util from 'util'
const pbkdf2 = util.promisify(crypto.pbkdf2)

export const generateHash = async (
  password: crypto.BinaryLike,
  salt?: crypto.BinaryLike,
) => {
  if (!salt) {
    salt = crypto.randomBytes(16).toString('hex')
  }
  const hash = (await pbkdf2(password, salt, 1000, 64, 'sha256')).toString(
    'hex',
  )
  return { salt, hash }
}
