// jsdom does not implement scrollIntoView, which AutofocusDirective calls.
Element.prototype.scrollIntoView ??= () => undefined;
