import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useNamespaceNavigate = () => {
  const params = useParams<{ namespace: string }>();
  const navigate = useNavigate();
  const namespaceUrl = `/${params.namespace}`;

  const namespaceNavigate = useCallback(
    (to: string) => {
      navigate(`${namespaceUrl}${to}`);
    },
    [navigate, namespaceUrl]
  );

  return { namespaceUrl, namespaceNavigate };
};
