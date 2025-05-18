// import { Dialog, Transition } from '@headlessui/react'
// import { Fragment, useState } from 'react'

// export default function RegisterModal() {
//     let [isOpen, setIsOpen] = useState(false)

//     function closeModal() {
//         setIsOpen(false)
//     }

//     function openModal() {
//         setIsOpen(true)
//     }

//     return (
//         <>
//             <div className="inset-0 flex items-center justify-center">
//                 <button
//                     type="button"
//                     onClick={openModal}
//                     style={{fontFamily: "Roboto Slab", fontWeight:"800"}}
//                     className="rounded-md px-4 py-2 text-5xl font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//                 >
//                     REGISTER
//                 </button>
//             </div>

//             <Transition appear show={isOpen} as={Fragment}>
//                 <Dialog as="div" className="relative z-10" onClose={closeModal}>
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"
//                     >
//                         <div className="fixed inset-0 bg-black bg-opacity-25" />
//                     </Transition.Child>

//                     <div className="fixed inset-0 overflow-y-auto">
//                         <div className="flex min-h-full items-center justify-center p-4 text-center">
//                             <Transition.Child
//                                 as={Fragment}
//                                 enter="ease-out duration-300"
//                                 enterFrom="opacity-0 scale-95"
//                                 enterTo="opacity-100 scale-100"
//                                 leave="ease-in duration-200"
//                                 leaveFrom="opacity-100 scale-100"
//                                 leaveTo="opacity-0 scale-95"
//                             >
//                                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                                     <Dialog.Title
//                                         as="h3"
//                                         className="text-lg font-medium leading-6 text-gray-900"
//                                     >
//                                         How would you like to register?
//                                     </Dialog.Title>
//                                     <div className="mt-2">
//                                         <p className="text-sm text-gray-500">
//                                             Groups can be of size 3-4.
//                                             <br/>
//                                             <br/>
//                                             Individual registrations give you access to the competition Discord so that you may find other individuals to group with. Upon the start of the competition, you will automatically be assigned a group if you have not made one yet.
//                                         </p>
//                                     </div>

//                                     <div className="mt-4 flex gap-4">
//                                         <button
//                                             type="button"
//                                             className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                             onClick={closeModal}
//                                         >
//                                             Groups
//                                         </button>
//                                         <button
//                                             type="button"
//                                             className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                                             onClick={closeModal}
//                                         >
//                                             Individuals
//                                         </button>
//                                     </div>
//                                 </Dialog.Panel>
//                             </Transition.Child>
//                         </div>
//                     </div>
//                 </Dialog>
//             </Transition>
//         </>
//     )
// }
