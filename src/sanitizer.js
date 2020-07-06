const sanitize = metric => {
  checkName(metric.name)
  checkValue(metric.value)
  checkSampleRate(metric.sampleRate)
  if(Array.isArray(metric.tags) && metric.tags.length) {
    checkTags(metric.tags)
  }
  return true
}
const checkName = name => {
  if(name.includes(':')) {
    throw new Error(`Illegal character : in metric name ${name}`)
  }
  if(name.includes('|')) {
    throw new Error(`Illegal character | in metric name ${name}`)
  }
  return true
}
const checkValue = number => {
  if(typeof number !== 'number') {
    throw new Error('Metric value is not a number')
  }
  return true
}
const checkSampleRate = number => {
  if(typeof number !== 'number') {
    throw new Error('Metric sample rate is not a number')
  }
  return true
}
const checkTags = tags => {
  tags.forEach(tag => {
    if(tag.includes('#')) {
      throw new Error(`Illegal character # in tag ${tag}`)
    }
    if(tag.includes('|')) {
      throw new Error(`Illegal character | in tag ${tag}`)
    }
  })
  return true
}
function sanitizeLabels(formattedLabels) {
  let sanitizedLabels = [];
  formattedLabels.forEach(label => {
      let finalLabel = label
      if(finalLabel.includes("#") || finalLabel.includes("|")) {
        let newLabel = []
        for(i = 0; i < finalLabel.length; i++) {
            if(finalLabel[i] === "#" || finalLabel[i] === "|") {
                newLabel.push("_")
            } else {
              newLabel.push(finalLabel[i])
            }

        }
        finalLabel = newLabel.join("")
      }
      sanitizedLabels.push(finalLabel)
    })
    return sanitizedLabels
}

sanitizeName = (name, prefix) => {
  let finalName = name
  let finalPrefix = prefix
  if(finalName.includes("#") || finalName.includes("|")) {
    let newName = []
    for(i = 0; i < finalName.length; i++) {
      if(finalName[i] === "#" || finalName[i] === "|") {
        newName.push("_")
      } else {
        newName.push(finalName[i])
      }
    }
    finalName = newName.join("")
  }
  if(finalPrefix && typeof finalPrefix === "string") {
    if(finalPrefix.includes("#") || finalPrefix.includes("|")) {
      let newPrefix = []
      for(i = 0; i < finalPrefix.length; i++) {
        if(finalPrefix[i] === "#" || finalPrefix[i] === "|") {
          newPrefix.push("_")
        } else {
          newPrefix.push(finalPrefix[i])
        }
      }
      finalPrefix = newPrefix.join("")
    }
  }
  return finalPrefix ? finalPrefix + "." + finalName : finalName
}

module.exports = {
  sanitize,
  sanitizeLabels,
  sanitizeName
}
