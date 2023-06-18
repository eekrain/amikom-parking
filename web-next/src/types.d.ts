import "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      // use:model
      form: any;
    }
  }
}
