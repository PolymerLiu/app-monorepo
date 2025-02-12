import { useCallback, useMemo } from 'react';

import { useIntl } from 'react-intl';

import { Network } from '@onekeyhq/engine/src/types/network';

import { useRuntime } from './redux';
import useOpenBrowser from './useOpenBrowser';

function buildTransactionDetailsUrl(
  network: Network | null | undefined,
  txId: string | null | undefined,
) {
  if (!network || !txId) return '';
  return network.blockExplorerURL.transaction.replace('{transaction}', txId);
}

function buildAddressDetailsUrl(
  network: Network | null | undefined,
  address: string | null | undefined,
) {
  if (!network || !address) return '';
  return network.blockExplorerURL.address.replace('{address}', address);
}

function buildBlockDetailsUrl(
  network: Network | null | undefined,
  block: string | null | undefined,
) {
  if (!network || !block) return '';
  return network.blockExplorerURL.block.replace('{block}', block);
}

export default function useOpenBlockBrowser(
  network: Network | null | undefined,
) {
  const intl = useIntl();
  const webview = useOpenBrowser();

  const { networks } = useRuntime();

  const hasAvailable = useMemo(() => {
    if (!network) return false;
    const currentNetwork = networks.find((x) => x.id === network.id);
    return !!currentNetwork?.blockExplorerURL?.address;
  }, [network, networks]);

  const openTransactionDetails = useCallback(
    (txId: string | null | undefined, title?: string) => {
      const url = buildTransactionDetailsUrl(network, txId);

      webview.openUrl(
        url,
        title ?? intl.formatMessage({ id: 'transaction__transaction_details' }),
      );
    },
    [intl, network, webview],
  );

  const openAddressDetails = useCallback(
    (txId: string | null | undefined, title?: string) => {
      const url = buildAddressDetailsUrl(network, txId);

      webview.openUrl(
        url,
        title ?? intl.formatMessage({ id: 'transaction__transaction_details' }),
      );
    },
    [intl, network, webview],
  );

  const openBlockDetails = useCallback(
    (txId: string | null | undefined, title?: string) => {
      const url = buildBlockDetailsUrl(network, txId);

      webview.openUrl(
        url,
        title ?? intl.formatMessage({ id: 'transaction__transaction_details' }),
      );
    },
    [intl, network, webview],
  );

  return useMemo(
    () => ({
      hasAvailable,
      openTransactionDetails,
      openAddressDetails,
      openBlockDetails,
    }),
    [
      hasAvailable,
      openAddressDetails,
      openBlockDetails,
      openTransactionDetails,
    ],
  );
}
