/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { request } from 'graphql-request'
import { IXyoConnectionConfig } from '../../xyo-context-config'

export const ethRedeem = async (config: IXyoConnectionConfig, command: any) => {
  const query = `
      query EthRedeem($txH: String!, $from: String!, $apiKey: String!, $signature: String!) {
        ethRedeem(txH: $txH, from: $from, apiKey: $apiKey, signature: $signature)
      }
    `

  const result = (await request(config.uri, query, command)) as any

  return [
    {
      result: result.ethRedeem,
      id: JSON.stringify(result.ethRedeem),
    },
  ]
}
