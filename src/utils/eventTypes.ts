// 常用 DOM 事件类型简写

// 表单输入相关
export type InputChange = React.ChangeEvent<HTMLInputElement>;
export type TextAreaChange = React.ChangeEvent<HTMLTextAreaElement>;
export type SelectChange = React.ChangeEvent<HTMLSelectElement>;

// 鼠标事件
export type MouseClick = React.MouseEvent<HTMLButtonElement>;
export type DivClick = React.MouseEvent<HTMLDivElement>;
export type AnchorClick = React.MouseEvent<HTMLAnchorElement>;

// 表单提交
export type FormSubmit = React.FormEvent<HTMLFormElement>;

// 拖拽事件
export type DragEvent = React.DragEvent<HTMLDivElement>;

// 键盘事件
export type KeyEvent = React.KeyboardEvent<HTMLInputElement>;

// 通用事件（用来 fallback）
export type AnyEvent = React.SyntheticEvent<unknown>;
