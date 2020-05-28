const sanitize = (name, amount, sampleRate, tags) => {
  checkName(name)
  checkValue(amount)
  sampleRate && checkSampleRate(sampleRate)
  if(Array.isArray(tags)) {
    checkTags(tags)
  }
  return true
}
const checkName = name => {
  if(name.includes('#')) {
    throw new Error(`Illegal character # in metric name ${name}`)
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
