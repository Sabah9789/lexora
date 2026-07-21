import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { Table } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { PiSlidersLight } from "react-icons/pi";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState(false);
  const columns = [
    { key: "ID", title: "Client ID" },
    { key: "Name", title: "Full Name" },
    { key: "Details", title: "Contact Details" },
    { key: "Case", title: "Case Count" },
    { key: "Status", title: "Status" },
    { key: "Actions", title: "Actions" },
  ];
  const [openModal, setOPenModal] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [open, setOpen] = useState(false);
  const [addClient, setAddClient] = useState("");
  const [clients, setClients] = useState([
    { id: 1, Name: "Ahmed", email: "ahmed@gmail.com", phone: "01012345678", Case: 5, Status: "Active", className: "" },
    { id: 2, Name: "Marcus ", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", jop: "CEO", Address: "720 Park", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
    { id: 3, Name: "Marcus Miller ", email: "m.miller@techlink.io", phone: "+1 (555) 882-1102", Case: 8, Status: "Active", className: "" },
    { id: 4, Name: "Marcus ", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
    { id: 5, Name: "Marcus Miller ", email: "m.miller@techlink.io", phone: "+1 (555) 882-1102", Case: 8, Status: "Active", className: "" },
    { id: 6, Name: "Marcus ", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
  ]);

  const deleteUser = (id) => {
    const filtered = clients.filter((client) => client.id !== id);
    setClients(filtered);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditClient({
      ...editClient,
      [name]: value,
    });
  };
  const handleUpdate = () => {
    setClients(clients.map((client) => (client.id === editClient.id ? editClient : client)));
    // setEditClient({
    //   Name: "",
    //   email: "",
    //   phone: "",
    //   Case: "",
    // });
    setOPenModal(false);
  };
  const handleAddClient = (e) => {
    const { name, value } = e.target;

    setAddClient({
      ...addClient,
      [name]: value,
    });
  };
  const handelAdd = () => {
    const newClient = {
      ...addClient,
      id: clients.length + 1,
    };

    setClients([...clients, newClient]);
    setAddClient({
      Name: "",
      email: "",
      phone: "",
      Case: "",
    });

    setOpen(false);
  };

  const C = {
    bg: "#021F19",
    bgLight: "#132B25",
    text: "#F5F2EC",
    textMuted: "#A7B0AB",
    accent: "#F05A22",
    fontFamily: "Cormorant Garamond, serif",
    //  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
  };

  return (
    <div className=" ">
      <div className="w-full flex  justify-between ">
        <div className="flex flex-col px-10 py-10 gap-2">
          <h1 className=" text-[30px]" style={{ color: C.text }}>
            Clients Management
          </h1>
          <p className=" text-[14px]" style={{ color: C.textMuted }}>
            Manage your firm's relationships and client communications.
          </p>
        </div>
        <div className=" flex  items-center px-10 gap-3">
          <button
            onClick={() => {
              setOpen(true);
            }}
            style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
            className="rounded-lg w-30 h-10 bg-[#132B25] shadow hover:bg-[#F05A22] transition-colors text-white duration-300 flex items-center justify-center gap-2 "
          >
            <IoIosAdd className="text-xl" /> ADD Client
          </button>
          {open && (
            <div className="fixed inset-0 bg-black/50 z-10 flex items-center justify-center" onClick={() => setOpen(false)}>
              <div className="bg-[#132B25] p-5 rounded-2xl flex flex-col w-80 gap-3 " onClick={(e) => e.stopPropagation()}>
                <input name="Name" value={addClient.Name} onChange={handleAddClient} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add Name" type="text" />
                <input value={addClient.email} onChange={handleAddClient} name="email" className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add Email" type="email" />
                <input name="phone" value={addClient.phone} onChange={handleAddClient} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add Number" type="number" />
                <input value={addClient.Case} onChange={handleAddClient} name="Case" className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add Case count" type="number" />
                <button
                  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                  className="btn btn-info"
                  onClick={() => {
                    handelAdd();
                    setOpen(false);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Table Section */}
      <div className="flex  flex-col justify-center items-center">
        <div style={{ border: "1px solid rgba(232,237,232,0.12)" }} className="flex flex-col items-center justify-center bg-[#132B25] w-[95%] shadow-2xl rounded-2xl">
          <div className=" h-15 w-full  flex justify-between items-center px-6">
            <input type="text" placeholder="Search clients by name, ID or email..." className="relative w-180 h-8  pl-10 rounded-lg placeholder:text-[#F5F2EC] bg-[#021F19]" style={{ border: "1px solid rgba(232,237,232,0.12)" }} />
            <CiSearch className="absolute text-white left-68" />
            <select className="rounded-lg h-8 text-[#A7B0AB] w-40 bg-[#021F19]  " style={{ border: "1px solid rgba(232,237,232,0.12)" }}>
              <PiSlidersLight />
              <option>Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button className="rounded-lg hover:bg-[#F05A22] hover:text-white w-70 h-8 bg-[#021F19] text-[#A7B0AB] flex justify-center items-center gap-3 " style={{ border: "1px solid rgba(232,237,232,0.12)" }}>
              <FaFilter /> Advanced Filters
            </button>
          </div>
          <table className=" px-10 py-10  table-fixed w-full ">
            <thead className="text-[#A7B0AB]">
              <tr>
                {columns.map((el, index) => (
                  <th key={el.key}>{el.title}</th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full text-[#F5F2EC] text-center">
              {clients.map((client) => (
                <tr key={client.id} className={`${client.className}`} style={client.style}>
                  <td className="text-[#A7B0AB] font-bold">{client.id}</td>
                  <td onClick={() => setSelectedClient(client)}>{client.Name}</td>
                  <td>
                    {client.email} <br /> <span style={{ color: "#A7B0AB" }}>{client.phone}</span>
                  </td>
                  <td>{client.Case}</td>
                  <td>{client.Status}</td>
                  <td className="flex gap-2 items-center justify-center mt-1 pr-1">
                    {/* Update */}
                    <button
                      onClick={() => {
                        setOPenModal(true);
                        setEditClient(client);
                      }}
                      style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                      className="rounded-lg w-30 h-10 bg-[#132B25] shadow hover:bg-[#F05A22] transition-colors text-white duration-300 flex items-center justify-center gap-2 "
                    >
                      <RxUpdate className="text-xl" /> Update
                    </button>
                    <button
                      onClick={() => {
                        deleteUser(client.id);
                      }}
                      style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                      className="rounded-lg w-30 h-10 bg-[#132B25] shadow hover:bg-[#F05A22] transition-colors text-white duration-300 flex items-center justify-center gap-2 "
                    >
                      <RiDeleteBin6Line className="text-xl" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {selectedClient && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-[#132B25] p-5 rounded-2xl w-96 h-[90vh] text-white">
                  <div className="flex justify-between">
                    <h1 className="text-[#F5F2EC] text-[18px] font-bold">Client Details</h1>
                    <IoIosClose onClick={() => setSelectedClient(false)} className="text-[24px] text-[#A7B0AB] hover:text-red-500" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h1 className="text-[20px] font-bold">{selectedClient.Name}</h1>
                    <p>{selectedClient.jop}</p>
                    <p>{selectedClient.id}</p>
                  </div>
                  <div className="grid grid-cols-2 p-10 gap-5 pt-5">
                    <button
                      onClick={() => {
                        setEditClient(selectedClient);
                        setSelectedClient(false);
                        setOPenModal(true);
                      }}
                      style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                      className="rounded-lg w-30 h-10 bg-[#132B25] shadow hover:bg-[#F05A22] transition-colors text-white duration-300 flex items-center justify-center gap-2 "
                    >
                      <FaRegFileAlt className="text-xl" /> Edit
                    </button>
                    <button style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg w-30 h-10 bg-[#132B25] shadow  transition-colors text-white  duration-300 flex items-center justify-center gap-2 ">
                      <CiUser className="text-xl " /> Assign
                    </button>
                    <button style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg w-30 h-10 bg-[#132B25] shadow text-[#F05A22] transition-colors  duration-300 flex items-center justify-center gap-2 ">
                      <TfiEmail className="text-xl text-[#F05A22]" /> Email
                    </button>
                    <button
                      onClick={() => {
                        deleteUser(selectedClient.id);
                        setSelectedClient(false);
                      }}
                      style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                      className="rounded-lg w-30 h-10 bg-[#132B25] shadow text-[#FF2056] transition-colors duration-300 flex items-center justify-center gap-2 "
                    >
                      <RiDeleteBin6Line className="text-xl text-[#FF2056]" /> Delete
                    </button>
                  </div>

                  {/* <button onClick={() => setSelectedClient(false)}>Close</button> */}
                </div>
              </div>
            )}
            {openModal && (
              // Overlay
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                <div
                  className="bg-[#132B25] p-5 rounded-2xl flex flex-col w-80 gap-3 "
                  // onClick={(e) => e.stopPropagation()}
                >
                  <input name="Name" value={editClient.Name} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit Name" type="text" />
                  <input name="email" value={editClient.email} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit Email" type="email" />
                  <input name="phone" value={editClient.phone} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit Number" type="number" />
                  <input name="Case" value={editClient.Case} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit Case count" type="number" />
                  <button
                    style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                    className="btn btn-info"
                    onClick={() => {
                      setOPenModal(false);

                      handleUpdate();
                    }}
                  >
                    Save Data
                  </button>
                </div>
              </div>
            )}
          </table>
          <div>
            <p className="text-[#A7B0AB] text-xl">Showing 1 to 5 of 84 clients</p>
          </div>
        </div>
      </div>
    </div>
  );
}
