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
const sanitizeLabels = (formattedLabels) => {
  let sanitizedLabels = [];
  formattedLabels.forEach(label => {
      while (label.includes("#") || label.includes("|")) {
        label = label.replace("#", "_").replace("|", "_")
      }
      sanitizedLabels.push(label)
    })
    return sanitizedLabels
}
const sanitizeName = (name, prefix) => {
  while (name.includes("#") || name.includes("|")) {
    name = name.replace("#", "_").replace("|", "_")
  }
  if(prefix && typeof prefix === "string") {
    while (prefix.includes("#") || prefix.includes("|")) {
      prefix = prefix.replace("#", "_").replace("|", "_")
    }
  }
  return prefix ? prefix + "." + name : name
}

module.exports = {
  sanitize,
  sanitizeLabels,
  sanitizeName
}
