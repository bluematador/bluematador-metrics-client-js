const sanitize = metric => {
  checkName(metric.name);
  checkValue(metric.value);
  checkSampleRate(metric.sampleRate);
  if(Array.isArray(metric.tags) && metric.tags.length) {
    checkTags(metric.tags);
  }
  return true
}
const checkName = name => {
  if(name.includes(':')) {
    throw new Error(`Illegal character : in metric name ${name}`);
  }
  if(name.includes('|')) {
    throw new Error(`Illegal character | in metric name ${name}`);
  }
  return true
}
const checkValue = number => {
  if(typeof number !== 'number') {
    throw new Error('Metric value is not a number');
  }
  return true
}
const checkSampleRate = number => {
  if(typeof number !== 'number') {
    throw new Error('Metric sample rate is not a number');
  }
  return true
}
const checkTags = tags => {
  tags.forEach(tag => {
    if(tag.includes('#')) {
      throw new Error(`Illegal character # in tag ${tag}`);
    }
    if(tag.includes('|')) {
      throw new Error(`Illegal character | in tag ${tag}`);
    }
  })
  return true
}
function sanitizeLabels(formattedLabels) {
  let sanitizedLabels = [];
  formattedLabels.forEach(label => {
    label = label.replace(/#|\|/gi, "_")
      sanitizedLabels.push(label);
    })
    return sanitizedLabels
}
const sanitizeName = (name, prefix) => {
  name = name.replace(/:|\|/gi, "_");
  if(prefix && typeof prefix === "string") {
    prefix = prefix.replace(/:|\|/gi, "_");
  }
  return prefix ? prefix + "." + name : name
}

module.exports = {
  sanitize,
  sanitizeLabels,
  sanitizeName
}
