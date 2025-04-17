import { getBreadcrumbJsonLd } from '~/lib/structured-data';
import { StructuredDataSupportedPath } from '~/types/typedef';
import { AdditionalBreadCrumbCBType } from '../lib/structured-data';

export default function StructuredData({
  path,
  additionalBreadCrumbCBs
}: {
  path: StructuredDataSupportedPath;
  additionalBreadCrumbCBs?: AdditionalBreadCrumbCBType;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: getBreadcrumbJsonLd(path, ...(additionalBreadCrumbCBs ?? [])) ?? '{}'
      }}
    />
  );
}
