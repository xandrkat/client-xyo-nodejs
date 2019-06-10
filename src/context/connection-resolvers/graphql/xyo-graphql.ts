// tslint:disable: prefer-array-literal
import { IConnectionResolver } from '../../xyo-connection-resolver'
import { IXyoConnectionConfg } from '../../xyo-context-config'
import { about } from './xyo-graphql-about'
import { request } from 'graphql-request'

export const graphQlResolver: IConnectionResolver = {
  canResolve: (config: IXyoConnectionConfg) => {
    return config.interface === 'graphql'
  },
  getSupports: async(config: IXyoConnectionConfg) => {
    const supportedQueries: {[key: string]: <T>(config: IXyoConnectionConfg, command: string) =>  Promise<Array<{result: T, id: string}>> } = {}
    const queryNames = await getAllSupportsFromSchema(config.uri)

    queryNames.forEach((queryName: string) => {
      if (allQueries[queryName]) {
        supportedQueries[queryName] = allQueries[queryName]
      }
    })

    return supportedQueries
  },
}

const allQueries: {[key: string]: <T>(config: IXyoConnectionConfg, command: string) =>  Promise<Array<{result: T, id: string}>> } = {
  about
}

const getAllSupportsFromSchema = async(endpoint: string) => {
  const query = `
    query Schema {
      __schema {
          queryType {
                  name
                  fields {
                      name
                  }
              }
          }
      }
      `

  const result = await request(endpoint, query) as any
  return result.__schema.queryType.fields.map((queryAbout: any) => queryAbout.name)
}