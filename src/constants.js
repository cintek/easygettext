const PROGRAM_NAME = 'easygettext';

const DEFAULT_ATTRIBUTES = [
  'get-text',
  'i18n',
  'translate',
];

const DEFAULT_FILTERS = [
  'i18n',
  'translate',
];

const DEFAULT_VUE_GETTEXT_FUNCTIONS = {
  '_': ['msgid'],
  '$t': ['msgid'],
  '$gettext': ['msgid'],
  '$ngettext': ['msgid', 'plural', null],
  '$pgettext': ['msgctxt', 'msgid'],
  '$npgettext': ['msgctxt', 'msgid', 'plural', null],
};

const DEFAULT_START_DELIMITER = '{{';
const DEFAULT_END_DELIMITER = '}}';

// Could for example be '::', used by AngularJS to indicate one-time bindings.
const DEFAULT_FILTER_PREFIX = null;

const DEFAULT_DELIMITERS = {
  start: '{{',
  end: '}}',
};

const ATTRIBUTE_COMMENT = 'comment';
const ATTRIBUTE_CONTEXT = 'context';
const ATTRIBUTE_PLURAL = 'plural';

const MARKER_NO_CONTEXT = '__NOCONTEXT__';

export {
  PROGRAM_NAME,
  DEFAULT_ATTRIBUTES,
  DEFAULT_FILTERS,
  DEFAULT_VUE_GETTEXT_FUNCTIONS,
  DEFAULT_START_DELIMITER,
  DEFAULT_END_DELIMITER,
  DEFAULT_FILTER_PREFIX,
  DEFAULT_DELIMITERS,
  ATTRIBUTE_COMMENT,
  ATTRIBUTE_CONTEXT,
  ATTRIBUTE_PLURAL,
  MARKER_NO_CONTEXT,
};
