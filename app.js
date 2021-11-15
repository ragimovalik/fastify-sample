module.exports = function (instance, opts, done) {
  instance.decorate('html', (payload) => {
    return generateHtml(payload)
  })
  //   done()
}
