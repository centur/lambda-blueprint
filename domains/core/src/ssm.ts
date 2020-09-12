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
      const response = await this.ssm.getParametersByPath(request).promise();
      const result: Record<string, string> = {};
      if (response.Parameters) {
        // @ts-ignore
        response.Parameters.forEach((parameter) => { result[parameter.Name] = parameter.Value; });
      }
      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
