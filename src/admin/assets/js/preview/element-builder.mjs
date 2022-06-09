export const el = (tag, ...children) => h(tag, {}, children);
export const elc = (tag, className, ...children) => h(tag, { className }, children);
export const eli = (tag, id, ...children) => h(tag, { id }, children);
export const wrap = (...content) => elc("div", "preview-wrapper", content);
export const html = (__html) => ({ dangerouslySetInnerHTML: { __html } });
