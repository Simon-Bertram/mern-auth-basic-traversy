import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../redux/slices/usersApiSlice'
import { logout } from '../redux/slices/authSlice'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DropdownTwo = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall, { isLoading }] = useLogoutMutation()

  const getInitials = (name) => {
    const nameArray = name.split(' ')

    if (nameArray.length === 1) {
      return nameArray[0].slice(0, 1).toUpperCase()
    } else {
      return (
        nameArray[0].slice(0, 1).toUpperCase() + nameArray[1].slice(0, 1).toUpperCase()
      )
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/')
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-900 px-3 py-2 text-md font-semibold tracking-widest text-white shadow-sm ring-2 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-blue-800">
          {getInitials(userInfo.name)}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>

            <form onSubmit={handleSubmit}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownTwo