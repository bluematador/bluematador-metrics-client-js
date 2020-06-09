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

module.exports = {
  sanitize
}
