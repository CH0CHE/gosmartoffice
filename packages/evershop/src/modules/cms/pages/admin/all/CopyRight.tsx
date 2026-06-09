import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';

interface CopyRightProps {
  themeConfig: {
    copyRight: string;
  };
}
export default function CopyRight({
  themeConfig: { copyRight }
}: CopyRightProps) {
  return (
    <div className="copyright">
      <span>{_(copyRight)}</span>
    </div>
  );
}

CopyRight.defaultProps = {
  themeConfig: {
    copyRight: '© 2026 GoSmartOffice. Todos los derechos reservados.'
  }
};

export const layout = {
  areaId: 'footerLeft',
  sortOrder: 10
};

export const query = `
  query query {
    themeConfig {
      copyRight
    }
  }
`;
