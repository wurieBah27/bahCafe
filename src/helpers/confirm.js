import Swal from "sweetalert2";

const confirmOperation = async (data = {}) => {
  try {
    const confirmResult = await Swal.fire({
      title: data.title,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: data?.confirmButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: data?.confirText,
          text: data?.orderText,
          icon: "success",
        });

        return result.isConfirmed;
      } else if (result.isDismissed) {
        Swal.fire({
          title: "Cancelled",
          text: "Operation was cancelled",
          icon: "error",
        });
        console.log(result);
        return false;
      }
    });

    return confirmResult;
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
};

export default confirmOperation;
