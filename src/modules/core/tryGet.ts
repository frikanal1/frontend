// Wrapper so I can do const foo = functionThatCanThrow();
// just an experiment for now really
export function tryGet<T>(getter: () => T):
  | {
      success: true
      value: T
    }
  | {
      success: false
      error: Error
      value?: T
    } {
  try {
    return {
      success: true,
      value: getter(),
    }
  } catch (error) {
    return {
      success: false,
      error: error as Error,
    }
  }
}
