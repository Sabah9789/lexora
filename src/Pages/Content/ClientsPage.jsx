import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";
import { RxUpdate } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
// import { PiSlidersLight } from "react-icons/pi";
import { useEffect, useMemo, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Listbox } from "@headlessui/react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ClientsPage() {
  const [sorting, setSorting] = useState([]);
  const [selectedClient, setSelectedClient] = useState(false);
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Client ID" },
      { accessorKey: "fullName", header: "Full Name" },
      { accessorKey: "details", header: "Contact Details" },
      { accessorKey: "case", header: "Case Count" },
      { accessorKey: "statu", header: "Status" },
      { accessorKey: "actions", header: "Actions" },
    ],
    [],
  );

  const [openModal, setOPenModal] = useState(false);
  const [openMdalAdvance, setOpenModalAdvance] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [open, setOpen] = useState(false);
  const [addClient, setAddClient] = useState({ fullName: "", email: "", phone: "", address: "", notes: "", statu: "", National: "", JopTitel: "" });
  const [clients, setClients] = useState([
    // { id: 1, Name: "Ahmed", email: "ahmed@gmail.com", phone: "01012345678", Case: 5, Status: "Active", className: "" },
    // { id: 2, Name: "Marcus ", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", jop: "CEO", Address: "720 Park", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
    // { id: 3, Name: "Marcus Miller ", email: "m.miller@techlink.io", phone: "+1 (555) 882-1102", Case: 8, Status: "Active", className: "" },
    // { id: 4, Name: "Hossam ", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
    // { id: 5, Name: "Omar ", email: "m.miller@techlink.io", phone: "+1 (555) 882-1102", Case: 8, Status: "Active", className: "" },
    // { id: 6, Name: "Mohamed ", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
    // { id: 7, Name: "Tota ", email: "m.miller@techlink.io", phone: "+1 (555) 882-1102", Case: 8, Status: "Active", className: "" },
    // { id: 8, Name: "Za3bola", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
    // { id: 9, Name: "Bote ", email: "m.miller@techlink.io", phone: "+1 (555) 882-1102", Case: 8, Status: "Active", className: "" },
    // { id: 10, Name: "Fares ", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
    // { id: 11, Name: "Hassan ", email: "m.miller@techlink.io", phone: "+1 (555) 882-1102", Case: 8, Status: "Active", className: "" },
    // { id: 12, Name: "Mahmoud ", email: "e.vance@law.net", phone: "+1 (555) 102-9933", Case: 12, Status: "Inactive", className: "bg-[#021F19]", style: { border: "1px solid rgba(232,237,232,0.12)" } },
  ]);

  // const deleteUser = (id) => {
  //   const filtered = clients.filter((client) => client.id !== id);
  //   setClients(filtered);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditClient({
      ...editClient,
      [name]: value,
    });
  };
  // const handleUpdate = () => {
  //   setClients(clients.map((client) => (client.id === editClient.id ? editClient : client)));
  //   // setEditClient({
  //   //   Name: "",
  //   //   email: "",
  //   //   phone: "",
  //   //   Case: "",
  //   // });
  //   setOPenModal(false);
  // };
  const handleAddClient = (e) => {
    const { name, value } = e.target;

    setAddClient({
      ...addClient,
      [name]: value,
    });
  };
  // const handeladd = () => {
  //   const newClient = {
  //     ...addClient,
  //     id: clients.length + 1,
  //   };

  //   setClients([...clients, newClient]);
  //   setAddClient({
  //     Name: "",
  //     email: "",
  //     phone: "",
  //     Case: "",
  //   });

  //   setOpen(false);
  // };
  const C = {
    bg: "#021F19",
    bgLight: "#132B25",
    text: "#F5F2EC",
    textMuted: "#A7B0AB",
    accent: "#F05A22",
    fontFamily: "Cormorant Garamond, serif",
    //  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
    // {/* prettier-ignore */}
  };



  // 1 CRUD System with strapi
  const getClients = () => {
    let domain = "http://localhost:1337";
    let endPoint = "/api/clients";
    let url = domain + endPoint;
    axios
      .get(url)
      .then((res) => {
        console.log(" العميل جيه ولا ياولا  ");
        console.log(res.data);
        setClients(res.data.data);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  };
  // هنا بقله هات العملا الي انت مخزنها
  useEffect(() => {
    getClients();
  }, []);
  // 2
  const AddClient = () => {
    const toastId = toast.loading("Adding client...");
    console.log(addClient);
    let domain = "http://localhost:1337";
    let endPoint = "/api/clients";
    let url = domain + endPoint;
    axios
      .post(url, {
        data: {
          fullName: addClient.fullName,
          email: addClient.email,
          phone: addClient.phone,
          address: addClient.address,
          notes: addClient.notes,
          statu: addClient.statu,
          National: addClient.National,
          JopTitel: addClient.JopTitel,
          // cases: addClient.cases,
          // locale:addClient.locale,
          // localizations: addClient.localizations,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAddClient({
          fullName: "",
          email: "",
          phone: "",
          address: "",
          notes: "",
          statu: "",
        });
        getClients();
        toast.success("Client added successfully.", {
          id: toastId,
        });
      })
      .catch((err) => {
        console.log(err.response?.data.error);
        toast.error("Failed to add client.", {
          id: toastId,
        });
      });
  };
  // 3
  const UpdateClient = (id) => {
    const toastId = toast.loading("Updating client...");
    console.log(id);
    let domain = "http://localhost:1337";
    let endPoint = `/api/clients/${id}`;
    let url = domain + endPoint;
    axios
      .put(url, {
        data: {
          fullName: editClient.fullName,
          email: editClient.email,
          phone: editClient.phone,
          address: editClient.address,
          notes: editClient.notes,
          statu: editClient.statu,
          National: editClient.National,
          JopTitel: editClient.JopTitel,
          // locale:addClient.locale,
          // localizations: addClient.localizations,
        },
      })
      .then((res) => {
        console.log("هو دة التعديل المظبوط");
        console.log(res.data.data);
        getClients();
        toast.success("Client Update successfully.", {
          id: toastId,
        });
      })
      .catch((err) => {
        console.log(err.response?.data.error);
        toast.error("Failed to Update client.", {
          id: toastId,
        });
      });
  };
  // 4
  const deleteClient = (id) => {
    const toastId = toast.loading("Deleting client...");
    let url = `http://localhost:1337/api/clients/${id}`;

    axios
      .delete(url)
      .then((res) => {
        console.log("هو دة الحذف المظبوط");
        console.log(res.data);
        getClients();
        toast.success("Client deleted successfully.", {
          id: toastId,
        });
      })
      .catch((err) => {
        console.log(err.response?.data);
        toast.error("Failed to delete client.", {
          id: toastId,
        });
      });
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Client?",
      text: "This action can't be undone.",
      icon: "warning",
      showCancelButton: true,
      scrollbarPadding: false,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F05A22",
      cancelButtonColor: "#132B25",
    });

    if (result.isConfirmed) {
      deleteClient(id);
    }
  };

  // Filter,clients, search, filters
  const [search, setSearch] = useState("");
  // const [status, setStatus] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    paymentStatus: [],
    clientName: "",
    clientNumber: "",
    caseInfo: "",
    registrationPeriod: "",
    fromDate: "",
    toDate: "",
    lawyer: "",
  });
  const handlePaymentStatus = (value) => {
    if (filters.paymentStatus.includes(value)) {
      setFilters({
        ...filters,
        paymentStatus: filters.paymentStatus.filter((item) => item !== value),
      });
    } else {
      setFilters({
        ...filters,
        paymentStatus: [...filters.paymentStatus, value],
      });
    }
  };
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const name = client.fullName?.toLowerCase() || "";
      const email = client.email?.toLowerCase() || "";
      const id = client.documentId?.toString().toLowerCase() || "";
      const q = search.toLowerCase();
      const matchesCaseInfo =
        filters.caseInfo === "" ||
        // ولو الداتا جاية من   ومفيش  Case عندك لكن اسمها caseCount مثلاً:
        (filters.caseInfo === "1-5 Cases" && client.Case >= 1 && client.Case <= 5) ||
        (filters.caseInfo === "6-10 Cases" && client.Case >= 6 && client.Case <= 10) ||
        (filters.caseInfo === "11-20 Cases" && client.Case >= 11 && client.Case <= 20) ||
        (filters.caseInfo === "20+ Cases" && client.Case > 20);
      const matchesSearch = name.includes(q) || email.includes(q) || id.includes(q);
      const matchesName = filters.clientName === "" || client.fullName?.toLowerCase().includes(filters.clientName.toLowerCase());
      const matchesNumber = filters.clientNumber === "" || client.documentId?.toString().includes(filters.clientNumber);
      // const matchesStatus = status === "" || client.statu === status;
      const matchesStatus = filters.status === "" || client.statu === filters.status;
      //  false الداتا وهيرجع sringfy  لو عملتها كدة يبقا ب
      // const matchesCaseInfo = filters.caseInfo === "" || client.Case === filters.caseInfo;
      const matchesFromDate = filters.fromDate === "" || new Date(client.createdAt) >= new Date(filters.fromDate);
      const matchesToDate = filters.toDate === "" || new Date(client.createdAt) <= new Date(filters.toDate);
      const matchesPaymentStatus = filters.paymentStatus.length === 0 || filters.paymentStatus.includes(client.paymentStatus);

      return matchesSearch && matchesStatus && matchesName && matchesNumber && matchesCaseInfo && matchesFromDate && matchesToDate && matchesPaymentStatus;
    });
  }, [clients, search, filters]);

  const table = useReactTable({
    data: filteredClients,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });
  const sendEmail = (email) => {
    const subject = "Lexora Notification";
    const body = `
Hello ${selectedClient.fullName},
Your case has been updated.
Regards,
Lexora Team.
`;

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    // window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`);
    // window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  
  return (
    <div>
      <div className=" w-full flex  justify-between ">
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
                <input name="fullName" value={addClient.fullName} onChange={handleAddClient} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add Name" type="text" />
                <input name="email" value={addClient.email} onChange={handleAddClient} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add Email" type="email" />
                <input name="phone" value={addClient.phone} onChange={handleAddClient} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add Number" type="phone" />
                <input name="address" value={addClient.address} onChange={handleAddClient} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add address" type="address" />
                <input name="National" value={addClient.National} onChange={handleAddClient} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add National ID" type="National" />
                <input name="JopTitel" value={addClient.JopTitel} onChange={handleAddClient} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Add Your JopTitel" type="JopTitel" />
                <Listbox
                  name="statu"
                  value={addClient.statu}
                  onChange={(value) =>
                    setAddClient({
                      ...addClient,
                      statu: value,
                    })
                  }
                  className=" rounded-xl h-10 pl-3 text-[#A7B0AB] "
                  style={{ border: "1px solid rgba(232,237,232,0.12)" }}
                >
                  <div className="relative">
                    <Listbox.Button className="h-10 rounded-xl text-start text-[#A7B0AB] w-full "> {addClient.statu || "Select Status"}</Listbox.Button>
                    <Listbox.Options className=" w-64 absolute  rounded-xl  shadow-lg  bg-[#132B25]">
                      <Listbox.Option value="Active" className="p-3 cursor-pointer hover:bg-[#F05A22] hover:text-white">
                        Active
                      </Listbox.Option>
                      <Listbox.Option value="Inactive" className="p-3 rounded-b-xl cursor-pointer hover:bg-[#F05A22] hover:text-white">
                        Inactive
                      </Listbox.Option>
                    </Listbox.Options>
                  </div>
                </Listbox>
                <button
                  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                  className="btn btn-info"
                  onClick={() => {
                    AddClient();
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
          {/* prettier-ignore */}
          <div className=" h-15 w-full  flex justify-between items-center px-6">
            <input type="text" onChange={(e) => { setSearch(e.target.value);}} placeholder="Search clients by name, ID or email..."  className="relative w-140 h-8  pl-10 rounded-lg placeholder:text-[#F5F2EC] bg-[#021F19] text-[#A7B0AB]"  style={{ border: "1px solid rgba(232,237,232,0.12)" }}  />
            <CiSearch className="absolute text-white left-68" />
            <select value={sorting[0]?.id || ""}  onChange={(e) => {const value = e.target.value; if(value === "") {setSorting([]);  } else if (value === "name"){setSorting([{id: "fullName", desc: false,},]);
                } else if (value === "newest") { setSorting([{id: "id",desc: true, },]);} else if (value === "oldest") {setSorting([ {id: "id",desc: false,},]);}}}  className="rounded-lg h-8 text-[#A7B0AB] w-40 pl-2 bg-[#021F19]" style={{ border: "1px solid rgba(232,237,232,0.12)" }}>
              <option value="">Sort By</option>
              <option value="name">Name A-Z</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <select value={filters.status} onChange={(e) => {setFilters({...filters,status: e.target.value,})}}
              className="rounded-lg h-8 pl-2 text-[#A7B0AB] w-40 bg-[#021F19]  "
              style={{ border: "1px solid rgba(232,237,232,0.12)" }}>
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              onClick={() => {
                setOpenModalAdvance(true);
                // console.log("Clicked");
              }}
              className="rounded-lg hover:bg-[#F05A22] hover:text-white w-70 h-8 bg-[#021F19] text-[#A7B0AB] flex justify-center items-center gap-3 "
              style={{ border: "1px solid rgba(232,237,232,0.12)" }}>
              <FaFilter /> Advanced Filters</button>
          </div>
          <table className=" px-10 py-10  table-fixed w-full ">
            <thead className="text-[#A7B0AB]">
              <tr>
                {columns.map((el) => (
                  <th key={el.accessorKey}>{el.header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full text-[#F5F2EC] text-center">
              {table.getRowModel().rows.map((row) => {
                const client = row.original;
                return (
                  <tr key={row.id}>
                    <td className="text-[#A7B0AB] font-bold">{client.id}</td>
                    <td className={`cursor-pointer duration-300 ${selectedClient?.documentId === client.documentId ? "text-[#F05A22] font-bold" : "text-white"}`} onClick={() => setSelectedClient(client)}>
                      {client.fullName}
                    </td>
                    <td>
                      {client.email} <br />
                      <span style={{ color: "#A7B0AB" }}>{client.phone}</span>
                    </td>
                    <td>{client.Case}</td>
                    <td>{client.statu}</td>
                    {/* prettier-ignore */}
                    <td className="flex gap-2 items-center justify-center mt-1 pr-1">
                      {/* Update */}
                      <button onClick={() => {setOPenModal(true);setEditClient(client);}} style={{border: "1px solid rgba(255,255,255,0.05)",}}className="rounded-lg w-30 h-10 bg-[#132B25] shadow hover:bg-[#F05A22] transition-colors text-white duration-300 flex items-center justify-center gap-2">
                        <RxUpdate className="text-xl" /> Update</button>
                      {/* Delete */}
                      <button onClick={() => {handleDelete(client.documentId);}} style={{border: "1px solid rgba(255,255,255,0.05)",}}className="rounded-lg w-30 h-10 bg-[#132B25] shadow hover:bg-[#F05A22] transition-colors text-white duration-300 flex items-center justify-center gap-2">
                        <RiDeleteBin6Line className="text-xl" /> 
                        Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {selectedClient && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-[#132B25] p-5 rounded-2xl w-96 h-[90vh] text-white">
                <div className="flex justify-between">
                  <h1 className="text-[#F5F2EC] text-[18px] font-bold">Client Details</h1>
                  <IoIosClose onClick={() => setSelectedClient(false)} className="text-[24px] text-[#A7B0AB] hover:text-red-500" />
                </div>
                <div className="flex flex-col items-center">
                  <h1 className="text-[20px] font-bold">{selectedClient.fullName}</h1>
                  <p>{selectedClient.JopTitel}</p>
                  <p>{selectedClient.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => {
                      setEditClient(selectedClient);
                      setSelectedClient(false);
                      setOPenModal(true);
                    }}
                    style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                    className="rounded-lg h-10 bg-[#132B25] shadow hover:bg-[#F05A22] transition-colors text-white duration-300 flex items-center justify-center gap-2 "
                  >
                    <FaRegFileAlt className="text-xl" /> Edit
                  </button>
                  <button style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg  bg-[#132B25] shadow  transition-colors text-white  duration-300 flex items-center justify-center gap-2 ">
                    <CiUser className="text-xl " /> Assign
                  </button>
                  <button onClick={() => sendEmail(selectedClient.email)} style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg  bg-[#132B25] shadow text-[#F05A22] transition-colors  duration-300 flex items-center justify-center gap-2 ">
                    <TfiEmail className="text-xl text-[#F05A22] h-10" /> Email
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(selectedClient.documentId);
                      setSelectedClient(false);
                    }}
                    style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                    className="rounded-lg  bg-[#132B25] shadow text-[#FF2056] transition-colors duration-300 flex items-center justify-center gap-2 "
                  >
                    <RiDeleteBin6Line className="text-xl text-[#FF2056]" /> Delete
                  </button>
                </div>
                <p className="text-[#A7B0AB] text-xl p-2">Personal Information</p>
                <div>
                  <div className="flex justify-between">
                    <p className="text-[#A7B0AB] >">Email</p>
                    <p>{selectedClient.email}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[#A7B0AB] ></p>">phone</p>
                    <p>{selectedClient.phone}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[#A7B0AB] >">National ID</p>
                    <p>{selectedClient.National}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[#A7B0AB] >">Address</p>
                    <p>{selectedClient.address}</p>
                  </div>
                </div>
                <p className="text-[#A7B0AB] text-xl p-2">Financial Summary</p>
                <div className="bg-[#021F19] p-5 rounded-2xl">
                  <div className="flex justify-between">
                    <p className="text-[#A7B0AB] >">Total Billed</p>
                    <p>$54,200.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[#A7B0AB] >">Total Paid</p>
                    <p className="text-[#00D492]">$42,850.00</p>
                  </div>
                  <div className="my-4 h-px w-full bg-[#A7B0AB]"></div>
                  <div className="flex justify-between">
                    <p className="text-[#A7B0AB] >">Balance Due</p>
                    <p className="text-[#F05A22]">$11,350.00</p>
                  </div>
                </div>
                <div className="flex justify-between p-2 gap-2">
                  <button style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg w-1/2 bg-[#132B25] shadow  transition-colors text-white  duration-300 flex items-center justify-center gap-2 ">
                    <CiUser className="text-xl " /> Recent Activities
                  </button>
                  <button style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg w-1/2 bg-[#132B25] shadow text-[#F05A22] transition-colors  duration-300 flex items-center justify-center gap-2 ">
                    <TfiEmail className="text-xl text-[#F05A22] h-10" /> Documents (4)
                  </button>
                </div>
              </div>
            </div>
          )}
          {openModal && editClient && (
            // Overlay
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
              <div
                className="bg-[#132B25] p-5 rounded-2xl flex flex-col w-80 gap-3 "
                // onClick={(e) => e.stopPropagation()}
              >
                <input name="fullName" value={editClient.fullName} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit Name" type="text" />
                <input name="email" value={editClient.email} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit Email" type="email" />
                <input name="phone" value={editClient.phone} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit Number" type="number" />
                <input name="address" value={editClient.address} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit address" type="address" />
                <input name="National" value={editClient.National} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit National" type="National" />
                <input name="JopTitel" value={editClient.JopTitel} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit JopTitel" type="JopTitel" />
                <Listbox
                  name="statu"
                  value={editClient.statu}
                  onChange={(value) =>
                    setEditClient({
                      ...editClient,
                      statu: value,
                    })
                  }
                  className=" rounded-xl h-10 pl-3 text-[#A7B0AB] "
                  style={{ border: "1px solid rgba(232,237,232,0.12)" }}
                >
                  <div className="relative">
                    <Listbox.Button className="h-10 rounded-xl text-start text-[#A7B0AB] w-full "> {editClient.statu || "Select Status"}</Listbox.Button>
                    <Listbox.Options className=" w-64 absolute  rounded-xl  shadow-lg  bg-[#132B25]">
                      <Listbox.Option value="Active" className="p-3 cursor-pointer hover:bg-[#F05A22] hover:text-white">
                        Active
                      </Listbox.Option>
                      <Listbox.Option value="Inactive" className="p-3 rounded-b-xl cursor-pointer hover:bg-[#F05A22] hover:text-white">
                        Inactive
                      </Listbox.Option>
                    </Listbox.Options>
                  </div>
                </Listbox>
                {/* <input name="Case" value={editClient.Case} onChange={handleChange} className="rounded-xl h-10 pl-3 text-[#A7B0AB]" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} placeholder="Edit Case count" type="number" /> */}
                <button
                  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                  className="btn btn-info"
                  onClick={() => {
                    setOPenModal(false);
                    UpdateClient(editClient.documentId);
                  }}
                >
                  Save Data
                </button>
              </div>
            </div>
          )}
          {/* Pagination. */}
          {/* const عملنالها  */}
          {/* map وغيرنا طريقه عرض ال  client  */}
          {/* TanStack Table باستخدام مكتبه  */}
          <div className="flex items-center justify-between p-5  w-full">
            <p className="text-[#A7B0AB] text-xl">
              Showing {table.getState().pagination.pageIndex * 5 + 1}
              to {Math.min((table.getState().pagination.pageIndex + 1) * 5, filteredClients.length)}
              of {filteredClients.length} clients
            </p>
            <div className="w-50  flex justify-between p-2">
              <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="text-[#A7B0AB] text-xl hover:text-[#F05A22]  transition-all duration-300 disabled:opacity-60  ">
                ← Previous
              </button>
              <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="text-[#A7B0AB] text-xl hover:text-[#F05A22]  transition-all duration-300 disabled:opacity-60  ">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdvanceFilter handlePaymentStatus={handlePaymentStatus} open={openMdalAdvance} setOpen={setOpenModalAdvance} filters={filters} setFilters={setFilters} />
    </div>
  );
}

// {/* {clients.map((client) => ( */}

function AdvanceFilter({ open, setOpen, filters, setFilters, handlePaymentStatus }) {
  const resetFilters = () => {
    setFilters({
      status: "",
      paymentStatus: [],
      clientName: "",
      clientNumber: "",
      caseInfo: "",
      registrationPeriod: "",
      fromDate: "",
      toDate: "",
      lawyer: "",
    });
  };
  const C = {
    bg: "#021F19",
    bgLight: "#132B25",
    text: "#F5F2EC",
    textMuted: "#A7B0AB",
    accent: "#F05A22",
    fontFamily: "Cormorant Garamond, serif",
    //  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
    //  {/* prettier-ignore */}
  };
  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-10 flex items-center justify-center" onClick={() => setOpen(false)}>
          <div className="bg-[#021F19] p-5 h-[90%] rounded-2xl flex flex-col w-200 gap-3 " onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between h-15 rounded-b-xl" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
              <h1 className="text-[#F5F2EC] text-[20px]">Advanced Filters</h1>
              <IoIosClose onClick={() => setOpen(false)} className="text-[24px] text-[#A7B0AB] hover:text-red-500" />
            </div>
            {/* first Section =>  Client Status  Search Filters Payment Status  */}
            <section className="flex gap-15">
              <div className="w-1/2 flex flex-col gap-5 ">
                <h1 className="text-[#A7B0AB] text-[20px]">Client Status</h1>
                {/* prettier-ignore */}
                <div className=" grid grid-cols-2 gap-3 ">
                  <button onClick={()=>{setFilters({...filters,status:""})}} style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className={`rounded-lg h-8 shadow transition-all duration-300 ${filters.status === ""? "bg-[#F05A22] text-white ": "bg-[#132B25] text-[#A7B0AB]"}`}> All Clients</button>
                  <button onClick={()=>{setFilters({...filters,status:"Active"})}} style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}  className={`rounded-lg h-8 shadow transition-all duration-300 ${filters.status === "Active"? "bg-[#F05A22] text-white ": "bg-[#132B25] text-[#A7B0AB]"}`}>Active</button>
                  <button onClick={()=>{setFilters({...filters,status:'Inactive'})}} style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}  className={`rounded-lg h-8 shadow transition-all duration-300 ${filters.status === "Inactive"? "bg-[#F05A22] text-white ": "bg-[#132B25] text-[#A7B0AB]"}`}>Inactive</button>
                  <button onClick={()=>{setFilters({...filters,status:'Archived'})}} style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className={`rounded-lg h-8 shadow transition-all duration-300 ${filters.status === "Archived"? "bg-[#F05A22] text-white ": "bg-[#132B25] text-[#A7B0AB]"}`}>Archived</button>
                </div>
                {/* prettier-ignore */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#A7B0AB] text-[20px]">Search Filters</h1>
                  <div className="flex gap-3 ">
                    <label className="text-white"><input value={filters.clientName}onChange={(e)=>setFilters({...filters, clientName: e.target.value, }) } type="text" className = "rounded-lg w-45  h-8 bg-[#132B25] shadow pl-3"  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}  placeholder="Client Name"/></label>
                    <label className="text-white"> <input value={filters.clientNumber} onChange={(e) => setFilters({ ...filters,  clientNumber: e.target.value, })  } type="text" className="rounded-lg  w-45 h-8 bg-[#132B25] shadow pl-3" style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}  placeholder="Client Number" /> </label>
                  </div>
                </div>
              </div>
              {/* prettier-ignore */}
              <div className="w-1/2  flex flex-col gap-1 ">
                <h1 className="text-[#A7B0AB] text-[20px]">Payment Status</h1>
                <div className=" grid grid-cols-1 gap-3 ">
                   <label style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg w-50 h-8 bg-[#132B25] shadow text-[#A7B0AB] text-[16px] flex items-center pl-3 gap-2 ">
                    <input className="w-5 h-5 accent-[#F05A22]"type="checkbox" checked={filters.paymentStatus.includes("Paid")} onChange={() => {handlePaymentStatus("Paid");}}/>Paid </label>
                  <label style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg w-50 h-8 bg-[#132B25] shadow text-[#A7B0AB] text-[16px] flex items-center pl-3 gap-2 ">
                    <input checked={filters.paymentStatus.includes("Unpaid")} onChange={() => {handlePaymentStatus("Unpaid");}} className="w-5 h-5 accent-[#F05A22]" type="checkbox"/> Unpaid </label>
                  <label style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg w-50 h-8 bg-[#132B25] shadow text-[#A7B0AB] text-[16px] flex items-center pl-3 gap-2 ">
                    <input checked={filters.paymentStatus.includes("Overdue")}  onChange={() => {  handlePaymentStatus("Overdue");  }} className="w-5 h-5 accent-[#F05A22]" type="checkbox" /> Overdue </label>
                  <label style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }} className="rounded-lg w-50 h-8 bg-[#132B25] shadow text-[#A7B0AB] text-[16px] flex items-center pl-3 gap-2 "> 
                    <input  checked={filters.paymentStatus.includes("Pending")} onChange={() => {  handlePaymentStatus("Pending");  }} className="w-5 h-5 accent-[#F05A22]"  type="checkbox" />  Pending  </label>
                </div>
              </div>
            </section>
            {/* Second Section  => Case Information*/}
            <aside className="flex flex-col pt-1 gap-4 ">
              <h1 className="text-[#A7B0AB] text-[20px]">Case Information</h1>
              {/* prettier-ignore */}
              <div className=" flex gap-3 ">
                <button onClick={() =>setFilters({...filters,caseInfo:filters.caseInfo === "Has Cases"?"": "Has Cases",})} className={`rounded-2xl  h-8 w-25 bg-[#132B25] shadow text-[#A7B0AB] transition-colors border duration-300 flex items-center justify-center gap-2 ${filters.caseInfo === "Has Cases" ? "border-[#F05A22]": "border-[#A7B0AB]"}`} >Has Cases</button>
                <button onClick={() =>setFilters({...filters,caseInfo:filters.caseInfo === "1-5 Cases"?"": "1-5 Cases",})} className={`rounded-2xl  h-8 w-25 bg-[#132B25] shadow text-[#A7B0AB] transition-colors border duration-300 flex items-center justify-center gap-2 ${filters.caseInfo==="1-5 Cases" ?  "border-[#F05A22]": "border-[#A7B0AB]"}`}> 1 - 5 Cases</button>
                <button onClick={() =>setFilters({...filters,caseInfo:filters.caseInfo === "5-10 Cases"?"": "5-10 Cases",})} className={`rounded-2xl  h-8 w-25 bg-[#132B25] shadow text-[#A7B0AB] transition-colors border duration-300 flex items-center justify-center gap-2 ${filters.caseInfo === "5-10 Cases" ? "border-[#F05A22]": "border-[#A7B0AB]"}`}>5 - 10 Cases</button>
                <button onClick={() =>setFilters({...filters,caseInfo:filters.caseInfo === "More than 10"?"": "More than 10",})}  className={`rounded-2xl  h-8 w-25 bg-[#132B25] shadow text-[#A7B0AB] transition-colors border duration-300 flex items-center justify-center gap-2 ${filters.caseInfo === "More than 10" ?  "border-[#F05A22]": "border-[#A7B0AB]"}`}>More than 10</button>
              </div>
            </aside>
            {/* Third Section Registration Date  Assigned Lawyer */}
            <section className="flex">
              <div className="w-1/2 pt-2">
                <h1 className="text-[#F5F2EC] text-[20px]"> Registration Date</h1>
                <button
                  onClick={() => {
                    const today = new Date();
                    const before30 = new Date();
                    before30.setDate(today.getDate() - 30);
                    setFilters({ ...filters, fromDate: before30.toISOString().split("T")[0], toDate: today.toISOString().split("T")[0] });
                  }}
                  style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}
                  className="rounded-lg mt-2 w-50 h-8 bg-[#132B25] shadow text-[#A7B0AB] transition-colors  duration-300 flex items-center justify-center gap-2 "
                >
                  Last 30 Days
                </button>
                <div className="flex gap-3 pt-5 ">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#A7B0AB]">FROM</label>
                    <input
                      type="date"
                      value={filters.fromDate}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          fromDate: e.target.value,
                        })
                      }
                      type="date"
                      className="w-40 h-8 rounded-xl px-3 bg-[#021F19] text-[#F5F2EC] border border-[#24453F] outline-none focus:border-[#F05A22] duration-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#A7B0AB]">TO</label>
                    <input
                      type="date"
                      value={filters.toDate}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          toDate: e.target.value,
                        })
                      }
                      type="date"
                      className=" w-40 h-8 rounded-xl px-3 bg-[#021F19] text-[#F5F2EC] border border-[#24453F] outline-none focus:border-[#F05A22] duration-300"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 pt-2 flex flex-col gap-3">
                <h1 className="text-[#F5F2EC] text-[20px]">Assigned Lawyer</h1>
                <input
                  value={filters.lawyer}
                  onChange={(e) =>
                    setFilters({
                      ...filters,

                      lawyer: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Search lawyer..."
                  className="relative  h-8  pl-10 rounded-lg placeholder:text-[#F5F2EC] bg-[#021F19] text-[#A7B0AB]"
                  style={{ border: "1px solid rgba(232,237,232,0.12)" }}
                />
              </div>
            </section>
            {/* Fife Section */}
            {/* prettier-ignore */}
            <footer style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)" }} className="flex justify-between items-center p-4">
              <button onClick={() => {resetFilters();}}style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}className="rounded-xl w-40 h-9 bg-[#132B25] hover:bg-[#F05A22] hover:text-white shadow text-[#A7B0AB] transition-colors  duration-300 flex items-center justify-center gap-2 ">Reset Filters</button>
              <button onClick={() => {setOpen(false);}}style={{ border: "1px solid rgba(255, 255, 255, 0.05)" }}className="rounded-xl w-40 h-9 bg-[#F05A22] shadow text-white transition-colors  duration-300 flex items-center justify-center gap-2 ">Apply Filters</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

// CRUD               ✔
// Search             ✔
// Pagination         ✔
// Tanstack Table     ✔
// Advanced Filters   ✔
// Toast              ✔
// Modal              ✔
// Memoization        ✔
// API Integration    ✔
// Protected Route    ✔

// الفاضل:
// ----------------
// Sorting  ✔
// Statistics Cards
// Export
// Empty State
// Skeleton Loading
// Confirmation Modal  ✔
// Total Cases.
// Total Lawyers.
// Pending Payments.
// Upcoming Hearings.
// Documents Uploaded.

// Assign
// تعيين محامي أو موظف مسئول عن العميل.
// ربط العميل بقضية معينة.
// نقل العميل من محامي لمحامي آخر.
// ممكن يفتح Modal فيها قائمة بالمحامين الموجودين.
