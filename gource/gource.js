const { exec } = require('child_process')
const fs = require('fs')

function runGourceCommand(
  fileName,
  options = {
    RES_PARAM: '1280x720',
    LIB_PARAM: 'libx264',
  },
) {
  const fileCommand = fs.readFileSync(`./scripts/${fileName}`)
  try {
    let cmd = fileCommand.toString()
    for (let key in options) {
      cmd = cmd.replace(key, options[key])
    }
    console.log('Command that is run -->', cmd)

    const script = exec(cmd)
    script.stdout.on('data', function (data) {
      console.log(data.toString())
    })
    script.stderr.on('data', function (data) {
      console.error(data.toString())
    })
    script.on('exit', function (code) {
      console.log('program ended with code: ' + code)
      return code
    })
  } catch (error) {
    console.error(error)
    return false
  }
}

// TODO: As a user I should be able to specify the script with a command line argument
runGourceCommand('gource')

module.exports = runGourceCommand
