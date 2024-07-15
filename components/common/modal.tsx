import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon, ArrowPathIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  openModal: () => void;
  deleteFunc: () => void;
}

const Modal: React.FC<ModalProps> = ({ openModal, deleteFunc }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="w-full mt-3 mr-1 justify-center gap-x-1.5 text-sm text-black">
          <EllipsisVerticalIcon
            aria-hidden="true"
            className="h-6 w-6 text-black"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-4 z-10 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="">
          <MenuItem>
            <a
              href="#"
              onClick={openModal}
              className="flex block px-3 py-2 text-sm text-gray-500 data-[focus]:bg-gray-300 data-[focus]:text-gray-900"
            >
              <ArrowPathIcon className="h-5 w-5 mr-1" />
              Actualizar
            </a>
          </MenuItem>

          <MenuItem>
            <a
              href="#"
              onClick={() => deleteFunc()}
              className="flex block px-3 py-2 text-sm text-gray-500 data-[focus]:bg-gray-300 data-[focus]:text-gray-900"
            >
              <TrashIcon className="h-5 w-5 mr-1" />
              Borrar
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Modal;
