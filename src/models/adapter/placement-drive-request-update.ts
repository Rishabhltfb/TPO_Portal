// import PlacementDriveRequestUpdate from "../types/placement-drive.types/placement-drive-request-update.type";
// import PlacementDriveRequest from "../types/placement-drive.types/placment-drive-request.type";

// export const placmentDriveRequestUpdateToPlacmentDriveRequest = (
//     newPlacementDriveRequest: PlacementDriveRequestUpdate
// ): PlacementDriveRequest => {
//     const placementDriveRequest: PlacementDriveRequest = {
//         _id: newPlacementDriveRequest.id,
//         status: newPlacementDriveRequest.status,
//         rejectionFeedback: newPlacementDriveRequest.rejectionFeedback,
//         verified: newPlacementDriveRequest.verified ?? false,
//     };
//     return placementDriveRequest;
// };

// export const customerToCustomerUpdateRequest = (
//     customer: Customer
// ): CustomerUpdateRequest => {
//     const customerUpdateRequest: CustomerUpdateRequest = {
//         _id: customer._id,
//         name: customer.name,
//         city: customer.city,
//     };

//     if (customer.location && customer.location.coordinates.length) {
//         customerUpdateRequest.location = [
//             customer.location?.coordinates[0],
//             customer.location?.coordinates[1],
//         ];
//     }
//     return customerUpdateRequest;
// };
