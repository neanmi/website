import { ConfigContactPreview } from "./preview/config-contact.mjs";
import { ConfigErrorsPreview } from "./preview/config-errors.mjs";
import { ConfigFeaturesPreview } from "./preview/config-features.mjs";
import { FeaturePreview } from "./preview/feature.mjs";
import { ServicePreview } from "./preview/service.mjs";

CMS.registerPreviewStyle("/assets/css/main.min.css");
CMS.registerPreviewStyle("/admin/assets/css/preview.css");

CMS.registerPreviewTemplate("config-errors", ConfigErrorsPreview);
CMS.registerPreviewTemplate("config-features", ConfigFeaturesPreview);
CMS.registerPreviewTemplate("config-contact", ConfigContactPreview);
CMS.registerPreviewTemplate("services", ServicePreview);
CMS.registerPreviewTemplate("features", FeaturePreview);
