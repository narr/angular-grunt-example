describe('Performance', function() {
  'use strict';

  beforeEach(function() {
    browser.get('/');
  });

  it('Title', function(done) {
    var subject;
    var result = 'Performance Test';

    var title = element(by.css('.title'));
    console.time('Title Click');
    title.click();

    title.getText().then(function(txt) {
      subject = txt;
      console.timeEnd('Title Click');
      expect(subject).toEqual(result);
      done();
    });
  });
});
