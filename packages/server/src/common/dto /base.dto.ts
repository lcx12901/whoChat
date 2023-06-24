export class BaseDTO {
  id: string;
  /**
   * 创建时间
   * @example Date
   */
  readonly createTime: Date;
  /**
   * 更新时间
   * @example Date
   */
  readonly updateTime: Date;
}
