import { ConfigErrorsPreview } from "./preview/config-errors.mjs";

CMS.registerPreviewStyle("/assets/css/main.min.css");
CMS.registerPreviewStyle("/admin/assets/css/preview.css");

CMS.registerPreviewTemplate("config-errors", ConfigErrorsPreview);
