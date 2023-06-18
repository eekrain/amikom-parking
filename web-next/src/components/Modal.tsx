import { ParentComponent, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Transition } from "solid-transition-group";

const Modal: ParentComponent<{
  open: boolean;
  w?: "md" | "lg" | "xl" | "2xl";
}> = (props) => {
  if (!props.w) props.w = "md";

  return (
    <Portal>
      <Transition name="fade">
        <Show when={props.open}>
          <div class="fixed top-0 left-0 z-40 h-screen opacity-20 w-full bg-black" />
        </Show>
      </Transition>
      <Transition name="slide-fade-bottom">
        <Show when={props.open}>
          <div class="fixed top-4 left-0 right-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden sm:h-full md:inset-0 transition-all duration-500">
            <div class={`relative h-full w-full max-w-md px-4 md:h-auto`}>
              <div class="relative rounded-lg w-full bg-white shadow ">
                {props.children}
              </div>
            </div>
          </div>
        </Show>
      </Transition>
    </Portal>
  );
};

export default Modal;
