import toast from "../../utils/toast";

export default function CatchBlockFunction(error: any) {
  if (error.message !== "Cannot read property 'apply' of undefined") {
    if (error.message !== "Cannot read property 'context' of undefined") {
      if (error.message !== "e is undefined") {
        if (
          error.message !==
          "call: argument of type {context, fn} has undefined or null `fn`"
        ) {
          if (
            error.message !==
            "undefined is not an object (evaluating 'e.context')"
          ) {
            if (
              error.message !==
              "Cannot read properties of undefined (reading 'context')"
            ) {
              if (
                error.message !==
                "Cannot read properties of undefined (reading '0')"
              ) {
                if (
                  error.message !== "call: argument fn is undefined or null"
                ) {
                  if (
                    error.message !==
                    "Cannot read properties of undefined (reading 'results')"
                  ) {
                    if (error.response) {
                      if (error.response.status !== 401) {
                        if (error.response.data.errors) {
                          let dataerrer = error.response.data.errors.map(
                            (item: any) => {
                              return {
                                name: item?.property,
                                message: item?.message,
                              };
                            }
                          );

                          for (
                            let index = 0;
                            index < dataerrer.length;
                            index++
                          ) {
                            const element = dataerrer[index];
                            toast(element.message);
                          }
                        } else {
                          toast(error.response.data.message);
                        }
                      } else {
                        // localStorage.removeItem("token");
                      }
                    } else {
                      toast(error.message);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
