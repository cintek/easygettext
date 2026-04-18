import {
  SCRIPT_CONTAINING_DECOYS,
  SCRIPT_GETTEXT_SEQUENCE_FILENAME,
  SCRIPT_GETTEXT_SEQUENCE_TS,
  SCRIPT_USING_NGETTEXT_TS,
  SCRIPT_USING_PGETTEXT_TS,
  SCRIPT_WITH_ES_STAGE3_FEATURES,
  SCRIPT_WITH_STRING_CONCAT,
  SCRIPT_WITH_TEMPLATE_LITERALS,
  SCRIPT_WITH_TEMPLATE_LITERALS_WITH_VARIABLES,
  VUE_COMPONENT_EXPECTED_PROCESSED_TS_SCRIPT_TAG,
  VUE_COMPONENT_FILENAME,
} from './test-fixtures.js';
import {extractStringsFromTypeScript} from './typescript-extract.js';
import { MARKER_NO_CONTEXT } from './constants.js';
import { expect } from 'chai';


describe('TypeScript extractor object', () => {
  describe('Extraction of localized strings', () => {
    it('should extract strings localized using $gettext from the script', () => {
      const filename = VUE_COMPONENT_FILENAME;
      const extractedStrings = extractStringsFromTypeScript(
        filename,
        VUE_COMPONENT_EXPECTED_PROCESSED_TS_SCRIPT_TAG,
      );

      expect(extractedStrings.length).to.equal(3);

      const firstString = extractedStrings[0];
      const secondString = extractedStrings[1];
      const thirdString = extractedStrings[2];

      expect(firstString.msgid).to.equal('Hello there!');
      expect(firstString.msgctxt).to.equal(MARKER_NO_CONTEXT);
      expect(firstString.reference.file).to.equal(filename);
      // expect(firstString.reference.line).to.equal(10);

      expect(secondString.msgid).to.equal('Hello there!');
      expect(secondString.msgctxt).to.equal(MARKER_NO_CONTEXT);
      expect(secondString.reference.file).to.equal(filename);
      // expect(secondString.reference.line).to.equal(13);

      expect(thirdString.msgid).to.equal('General Kenobi! You are a bold one.');
      expect(thirdString.msgctxt).to.equal(MARKER_NO_CONTEXT);
      expect(thirdString.reference.file).to.equal(filename);
      // expect(thirdString.reference.line).to.equal(16);
    });

    it('should extract strings localized using $ngettext from the script', () => {
      const filename = '$ngettext.vue';
      const extractedStrings = extractStringsFromTypeScript(
        filename,
        SCRIPT_USING_NGETTEXT_TS,
      );

      expect(extractedStrings.length).to.equal(1);

      const firstString = extractedStrings[0];

      expect(firstString.msgid).to.equal('%{ n } foo');
      expect(firstString.msgctxt).to.equal(MARKER_NO_CONTEXT);
      expect(firstString.reference.file).to.equal(filename);
      // expect(firstString.reference.line).to.equal(6);
    });

    it('should allow gettext calls in array, object initializers', () => {
      const filename = SCRIPT_GETTEXT_SEQUENCE_FILENAME;
      const extractedStrings = extractStringsFromTypeScript(
        filename,
        SCRIPT_GETTEXT_SEQUENCE_TS,
      );
      expect(extractedStrings.length).to.equal(4);
      const firstString = extractedStrings[0];
      const secondString = extractedStrings[1];
      const thirdString = extractedStrings[2];
      const fourthString = extractedStrings[3];
      expect(firstString.msgid).to.equal('Hello there!');
      expect(firstString.reference.file).to.equal(filename);
      // expect(firstString.reference.line).to.equal(7);
      expect(secondString.msgid).to.equal('Hello there!');
      expect(secondString.reference.file).to.equal(filename);
      // expect(secondString.reference.line).to.equal(7);
      expect(thirdString.msgid).to.equal('Hello there!');
      expect(thirdString.reference.file).to.equal(filename);
      // expect(thirdString.reference.line).to.equal(8);
      expect(fourthString.msgid).to.equal('Hello there!');
      expect(fourthString.reference.file).to.equal(filename);
    });

    it('should extract contextual strings localized using $pgettext from the script', () => {
      const filename = '$ngettext.vue';
      const extractedStrings = extractStringsFromTypeScript(
        filename,
        SCRIPT_USING_PGETTEXT_TS,
      );

      expect(extractedStrings.length).to.equal(2);

      const firstString = extractedStrings[0];
      const secondString = extractedStrings[1];

      expect(firstString.msgid).to.equal('Home');
      expect(firstString.msgctxt).to.equal('menu');
      expect(firstString.reference.file).to.equal(filename);
      // expect(firstString.reference.line).to.equal(6);

      expect(secondString.msgid).to.equal('Home');
      expect(secondString.msgctxt).to.equal('house');
      expect(secondString.reference.file).to.equal(filename);
      // expect(secondString.reference.line).to.equal(9);
    });

    it('should not try to extract strings when the node is not a function', () => {
      const filename = 'traps.vue';
      const extractedStrings = extractStringsFromTypeScript(
        filename,
        SCRIPT_CONTAINING_DECOYS,
      );

      expect(extractedStrings.length).to.equal(1);
      expect(extractedStrings[0].msgid).to.equal('Hello world from the $gettext function');
    });

    it('should not break parser when using ECMAScript Stage 3 features', () => {
      const filename = 'stage3.vue';
      const extractedStrings = extractStringsFromTypeScript(
        filename,
        SCRIPT_WITH_ES_STAGE3_FEATURES,
      );

      expect(extractedStrings.length).to.equal(1);
      expect(extractedStrings[0].msgid).to.equal('Hello world from the future');
    });

    it('should be able to parse correctly concatenated strings', () => {
      const filename = 'temp_literals.vue';
      const extractedStrings = extractStringsFromTypeScript(
        filename,
        SCRIPT_WITH_STRING_CONCAT,
      );
      expect(extractedStrings.length).to.equal(3);
      expect(extractedStrings[0].msgid).to.equal('Hello there! I am a concatenated string,\n please translate me.');
    });

    it('should be able to parse correctly template strings without variables', () => {
      const filename = 'temp_literals.vue';
      const extractedStrings = extractStringsFromTypeScript(
        filename,
        SCRIPT_WITH_TEMPLATE_LITERALS,
      );
      expect(extractedStrings.length).to.equal(3);
      expect(extractedStrings[0].msgid).to.equal(
        '\nHello there!\n'
        + 'I am a multiline string,\n'
        + 'please translate me.');
    });

    it('should throw when trying to parse template strings with variables', () => {
      const filename = 'temp_literals.vue';
      expect(() => {
        extractStringsFromTypeScript(
          filename,
          SCRIPT_WITH_TEMPLATE_LITERALS_WITH_VARIABLES,
        );
      }).to.throw();
    });
  });
});
