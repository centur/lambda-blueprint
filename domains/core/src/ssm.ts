// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SSM.html
import * as SSM from "aws-sdk/clients/ssm";

export class ParameterStore {
  private ssm: SSM;

  constructor(options?: SSM.Types.ClientConfiguration) {
    this.ssm = new SSM(options);
  }

  async getParametersByPath(path: string): Promise<Record<string, string>> {
    const request: SSM.Types.GetParametersByPathRequest = {
      Path:           path,
      WithDecryption: true,
    };
    try {
      const result = await this.ssm.getParametersByPath(request).promise();
      const record: Record<string, string> = {};
      if (result.Parameters) {
        // @ts-ignore
        result.Parameters.forEach((parameter) => { record[parameter.Name] = parameter.Value; });
      }
      return record;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
