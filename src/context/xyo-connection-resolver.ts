/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { graphQlResolver } from './connectionResolvers/graphql/xyo-graphql'
import { IXyoConnectionConfig } from './xyo-context-config'

export interface IConnectionResolver {
  // tslint:disable-next-line:prefer-array-literal
  getSupports(
    config: IXyoConnectionConfig
  ): Promise<{
    [key: string]: <T>(
      config: IXyoConnectionConfig,
      command: any
    ) => Promise<Array<{ result: T; id: string }>>
  }>
  canResolve(config: IXyoConnectionConfig): boolean
}

export const resolveConnection = (
  config: IXyoConnectionConfig
): IConnectionResolver | undefined => {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < connectionResolvers.length; i++) {
    const trying = connectionResolvers[i]

    if (trying.canResolve(config)) {
      return trying
    }
  }

  return undefined
}

export const connectionResolvers = [graphQlResolver]
