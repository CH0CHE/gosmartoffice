import Area from '@components/common/Area.js';
import { InputField } from '@components/common/form/InputField.js';
import { TextareaField } from '@components/common/form/TextareaField.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@components/common/ui/Card.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';

interface SEOProps {
  product:
    | {
        urlKey: string;
        metaTitle: string;
        metaKeywords: string;
        metaDescription: string;
      }
    | undefined;
}
export default function SEO({ product }: SEOProps) {
  const fields = [
    {
      component: {
        default: (
          <InputField
            name="url_key"
            label={_('URL key')}
            placeholder={_('Enter URL key')}
            required
            defaultValue={product?.urlKey}
            validation={{
              required: _('URL key is required'),
              pattern: {
                value: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
                message: _('URL key must be lowercase and can only contain letters, numbers, and hyphens')
              }
            }}
          />
        )
      },
      sortOrder: 0
    },
    {
      component: {
        default: (
          <InputField
            name="meta_title"
            label={_('Meta title')}
            placeholder={_('Enter meta title')}
            required
            defaultValue={product?.metaTitle}
            validation={{
              required: _('Meta title is required')
            }}
          />
        )
      },
      sortOrder: 10
    },
    {
      component: {
        default: (
          <InputField
            type="hidden"
            name="meta_keywords"
            defaultValue={product?.metaKeywords}
          />
        )
      },
      sortOrder: 20
    },
    {
      component: {
        default: (
          <TextareaField
            name="meta_description"
            label={_('Meta description')}
            placeholder={_('Enter meta description')}
            defaultValue={product?.metaDescription || ''}
          />
        )
      },
      sortOrder: 30
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{_('Search engine optimize')}</CardTitle>
        <CardDescription>{_('Manage the SEO settings.')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Area
          id="productEditSeo"
          coreComponents={fields}
          className="flex flex-col gap-2"
        />
      </CardContent>
    </Card>
  );
}

export const layout = {
  areaId: 'leftSide',
  sortOrder: 60
};

export const query = `
  query Query {
    product(id: getContextValue('productId', null)) {
      urlKey
      metaTitle
      metaKeywords
      metaDescription
    }
  }
`;
