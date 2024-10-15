export default defineAppConfig({
  ui: {
    primary: "violet",
    gray: "neutral",
    accordion: {
      default: {
        size: "lg",
      },
    },
    select: {
      default: {
        size: "lg",
      },
    },
    button: {
      base: "focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 flex-shrink-0 transition-colors",
      default: {
        size: "lg",
      },
      color: {
        primary: {
          ghost: "text-primary-500 dark:text-primary-400 hover:bg-primary-600/10 dark:hover:bg-primary-400/10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",
        },
      },
    },
    input: {
      default: {
        size: "lg",
      },
    },
    formGroup: {
      default: {
        size: "lg",
      },
    },
  },
});
