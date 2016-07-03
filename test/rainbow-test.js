/* global Rainbow */

/////////////////////////
// Helpers and globals //
/////////////////////////

const expect = chai.expect;

const genericPatterns = [{
    name: 'test',
    pattern: /test/gi
}];

const patternA = [{
    name: 'a',
    pattern: /here/gi
}];

const patternB = [{
    name: 'b',
    pattern: /is/gi
}];

////////////////
// Test suite //
////////////////

describe('Rainbow', () => {
    it('Basic things are defined', () => {
        expect(Rainbow).to.exist;
        expect(Rainbow.color).to.be.a('function');
        expect(Rainbow.extend).to.be.a('function');
        expect(Rainbow.onHighlight).to.be.a('function');
        expect(Rainbow.addAlias).to.be.a('function');
    });

    it('Should apply global class', (done) => {
        Rainbow.extend('generic', [{
            name: 'name',
            pattern: /Craig/gm
        }]);

        Rainbow.color('My name is Craig', { language: 'generic', globalClass: 'global' }, (result) => {
            expect(result).to.equal('My name is <span class="name global">Craig</span>');
            done();
        });
    });

    it('Should properly use patterns', (done) => {
        Rainbow.extend('generic', genericPatterns);

        Rainbow.color('here is a test', 'generic', (result) => {
            expect(result).to.equal('here is a <span class="test">test</span>');
            done();
        });
    });

    it('Should properly extend generic patterns', (done) => {
        Rainbow.extend('newLanguage', patternA, 'generic');

        Rainbow.color('here is a test', 'newLanguage', (result) => {
            expect(result).to.equal('<span class="a">here</span> is a <span class="test">test</span>');
            done();
        });
    });

    it('Should properly extend other patterns that extend generic patterns', (done) => {
        Rainbow.extend('newLanguage', patternB);

        Rainbow.color('here is a test', 'newLanguage', (result) => {
            expect(result).to.equal('<span class="a">here</span> <span class="b">is</span> a <span class="test">test</span>');
            done();
        });
    });

    it('Should properly apply aliases', (done) => {
        Rainbow.addAlias('new', 'newLanguage');

        Rainbow.color('here is a test', 'new', (result) => {
            expect(result).to.equal('<span class="a">here</span> <span class="b">is</span> a <span class="test">test</span>');
            done();
        });
    });
});