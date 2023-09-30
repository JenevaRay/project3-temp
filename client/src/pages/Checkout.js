import { /*useStoreContext,*/ QUERY_REGISTRATIONS, Auth} from '../utils/';
// import { ADD_REGISTRATION } from '../utils/mutations';
import { useQuery /*, useMutation*/ } from '@apollo/client';
import dayjs from 'dayjs'

import Button from '../components/ui/Button';

const strToDayJS = (unixEpochStr) => dayjs(new Date(Number(unixEpochStr)));
const profile = Auth.loggedIn() ? Auth.getProfile() : undefined
const usStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

const Checkout = () => {
  const { loading, error, data } = useQuery(QUERY_REGISTRATIONS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const registrations = data.registrations
    .filter((registration)=>(registration.userId._id === profile.data._id && !registration.paid))
  const itemizedTotalInt = registrations
    .map((registration)=>(registration.eventId.feeRegistration + registration.eventId.feeVenue))
    .reduce((previousValue, currentValue)=>{return previousValue + currentValue}, 0)
  const itemizedTotal = ['$', String(itemizedTotalInt).slice(0, -2), '.', String(itemizedTotalInt).slice(2)].join('')
  const itemizedList = registrations.map((registration)=>(
    <>
      <div className="flex w-full flex-col px-4 py-4" key={registration._id}>
        <span className="font-semibold">{registration.eventId.name}</span>
        <span className="float-right text-zinc-400">Start {strToDayJS(registration.eventId.dateStart).format('MM/DD [@] h:mm A')}</span>
        <span className="float-right text-zinc-400">End {strToDayJS(registration.eventId.dateEnd).format('MM/DD [@] h:mm A')}</span>
        <p className="text-lg font-bold">{['$', String(registration.eventId.feeRegistration + registration.eventId.feeVenue).slice(0, -2), '.', String(registration.eventId.feeRegistration + registration.eventId.feeVenue).slice(2)]}</p>
      </div>
    </>

    
  ))
  //   .map((registration) => {

  // })
  // console.log(registrations)
  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-8 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a
          href="/"
          className="-m-1.5 p-1.5 text-lg font-extrabold leading-tight text-zinc-900">
          <span className="sr-only">codeathon</span>
          {'</>'} codeathon
        </a>
        <div className="mt-4 py-2 text-xs sm:ml-auto sm:mt-0 sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-zinc-900">Order</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-600 text-xs font-semibold text-white ring ring-zinc-600 ring-offset-2"
                  href="/">
                  2
                </a>
                <span className="font-semibold text-zinc-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-400 text-xs font-semibold text-white"
                  href="/">
                  3
                </a>
                <span className="font-semibold text-zinc-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid pb-12 sm:px-10 lg:grid-cols-2 lg:px-20 lg:pb-0 xl:px-32">
        <div className="px-4 pt-20">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-zinc-400">
            Check your items and select your preferred shipping method
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="/daypass.png"
                alt=""
              />
              {itemizedList}
            </div>
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="/lanyard.jpg"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">Codeathon Event Lanyard</span>
                <span className="float-right text-zinc-400">Green</span>
                <p className="mt-auto text-lg font-bold">$0.00</p>
              </div>
            </div>
          </div>

          <p className="mt-16 text-lg font-medium lg:mt-8">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                defaultChecked
              />
              <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-zinc-300 bg-white peer-checked:border-zinc-700"></span>
              <label
                className="flex cursor-pointer select-none rounded-lg border border-zinc-300 p-4 peer-checked:border-2 peer-checked:border-zinc-700 peer-checked:bg-zinc-50"
                htmlFor="radio_1">
                <img
                  className="w-14 object-contain"
                  src="/email.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Email Delivery</span>
                  <p className="text-sm leading-6 text-slate-500">
                    Estimated Time: 1-5 Minutes
                  </p>
                </div>
              </label>
            </div>
            {/* <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-zinc-300 bg-white peer-checked:border-zinc-700"></span>
              <label
                className="flex cursor-pointer select-none rounded-lg border border-zinc-300 p-4 peer-checked:border-2 peer-checked:border-zinc-700 peer-checked:bg-zinc-50"
                htmlFor="radio_2">
                <img
                  className="w-14 object-contain"
                  src="/fedex.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Fedex Delivery</span>
                  <p className="text-sm leading-6 text-slate-500">
                    Estimated Time: 2-4 Days
                  </p>
                </div>
              </label>
            </div> */}
          </form>
        </div>
        <div className="mt-0 bg-zinc-50 px-4 pt-20 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-zinc-400">
            Complete your order by providing your payment details
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mb-2 mt-4 block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-zinc-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mb-2 mt-4 block text-sm font-medium">
              Card Holder
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-zinc-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-zinc-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-no"
              className="mb-2 mt-4 block text-sm font-medium">
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-zinc-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-zinc-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                name="credit-expiry"
                className="w-full rounded-md border border-zinc-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="credit-cvc"
                className="w-1/6 flex-shrink-0 rounded-md border border-zinc-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
            <label
              htmlFor="billing-address"
              className="mb-2 mt-4 block text-sm font-medium">
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border border-zinc-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
              <select
                type="text"
                name="billing-state"
                className="w-full rounded-md border border-zinc-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                <option value="State">State</option>
                {usStates.map((state)=>{return (<option key={state.replace(" ", '')} value="State">{state}</option>)})}
                
              </select>
              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-zinc-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 sm:w-1/6"
                placeholder="ZIP"
              />
            </div>

            <div className="mt-6 border-b border-t py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900">Subtotal</p>
                <p className="font-semibold text-zinc-900">{itemizedTotal}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900">Shipping</p>
                <p className="font-semibold text-zinc-900">$0.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900">Total</p>
              <p className="text-2xl font-semibold text-zinc-900">{itemizedTotal}</p>
            </div>
          </div>
          <Button
            margin="mt-8"
            padding="px-6 py-3"
            borderRadius="rounded-md"
            bgColor="bg-zinc-900"
            hoverColor="hover:bg-zinc-900/90"
            width="w-full">
            Place Order
          </Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;




// function RegistrationList() {
//   const [state, dispatch] = useStoreContext();

//   const { currentEvent } = state;

//   const registrations = data.registrations.filter((registration)=>registration.userId._id === profile.data._id).map((registration) => (
    
//     <div key={registration._id} className="mx-10 mb-16 max-w-lg flex-1 rounded-xl bg-white p-6 shadow-xl">

//       <p className="text-base leading-loose text-zinc-800">
//         Event starts at {strToDayJS(registration.eventId.dateStart).format('MM/DD/YYYY [@] h:mma')}
//       </p>
//       <p className="text-base leading-loose text-zinc-800">
//         Event ends at {strToDayJS(registration.eventId.dateEnd).format('MM/DD/YYYY [@] h:mma')}
//       </p>
//       {/* <p>This registration is {registration.paid ? 'paid' : 'not paid'}</p> */}
//       {registration.paid ? 
//         <Button value={registration._id} margin="mt-4" width="w-full" padding="py-2">
//           {registration.role === 'host'? 'HOSTING': 'PAID'}
//         </Button> :
//         <Button value={registration._id} margin="mt-4" width="w-full" padding="py-2">
//           PAY {
//             ['$', String(registration.eventId.feeRegistration + registration.eventId.feeVenue).slice(0, -2), '.', String(registration.eventId.feeRegistration + registration.eventId.feeVenue).slice(2)]
//           } as {registration.role === 'attendee'? 'an ' : ''}{registration.role.toUpperCase()}
//         </Button>
//         }
//       {/* <p>You are {registration.role} for this event.</p> */}
//     </div>
//   ));
//   return <div className="mt-16 flex flex-wrap items-center justify-center">{registrations}</div>;
// }

// // export default RegistrationList;
