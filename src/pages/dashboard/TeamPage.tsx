import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus, Crown, Shield, User, Pencil, Trash2, X, Check,
  Mail, MapPin, ChevronRight, Users2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/aura/DashboardLayout";

type Role = "owner" | "manager" | "staff";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  location: string;
  avatar: string;
  status: "active" | "invited";
  lastActive: string;
}

const roleConfig: Record<Role, { label: string; icon: typeof Crown; color: string }> = {
  owner: { label: "Owner", icon: Crown, color: "text-aura-warning" },
  manager: { label: "Manager", icon: Shield, color: "text-primary" },
  staff: { label: "Staff", icon: User, color: "text-muted-foreground" },
};

const rolePermissions: Record<Role, string[]> = {
  owner: ["Full dashboard access", "Manage billing & subscription", "Invite & remove team members", "All location access", "Delete locations"],
  manager: ["View analytics & reports", "Manage cards & content", "Respond to reviews", "Assigned locations only", "Cannot manage billing"],
  staff: ["View assigned location", "Update basic info", "View reviews (read-only)", "Single location access", "Cannot invite members"],
};

const defaultTeam: TeamMember[] = [
  { id: "1", name: "Marco Bellini", email: "marco@bellavista.com", role: "owner", location: "All Locations", avatar: "MB", status: "active", lastActive: "Just now" },
  { id: "2", name: "Sofia Romano", email: "sofia@bellavista.com", role: "manager", location: "Downtown", avatar: "SR", status: "active", lastActive: "2h ago" },
  { id: "3", name: "Luca Moretti", email: "luca@bellavista.com", role: "manager", location: "Midtown", avatar: "LM", status: "active", lastActive: "1d ago" },
  { id: "4", name: "Elena Ricci", email: "elena@bellavista.com", role: "staff", location: "Downtown", avatar: "ER", status: "active", lastActive: "5h ago" },
  { id: "5", name: "James Chen", email: "james@bellavista.com", role: "staff", location: "Brooklyn", avatar: "JC", status: "invited", lastActive: "—" },
];

const TeamPage = () => {
  const [team, setTeam] = useState<TeamMember[]>(defaultTeam);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteForm, setInviteForm] = useState({ email: "", role: "staff" as Role, location: "Downtown" });
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleInvite = () => {
    const newMember: TeamMember = {
      id: String(Date.now()),
      name: inviteForm.email.split("@")[0],
      email: inviteForm.email,
      role: inviteForm.role,
      location: inviteForm.location,
      avatar: inviteForm.email.substring(0, 2).toUpperCase(),
      status: "invited",
      lastActive: "—",
    };
    setTeam((prev) => [...prev, newMember]);
    setShowInvite(false);
    setInviteForm({ email: "", role: "staff", location: "Downtown" });
    toast({ title: "Invitation sent", description: `Invite sent to ${newMember.email}` });
  };

  const handleRemove = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Team member removed" });
  };

  const groupedByRole = (role: Role) => team.filter((m) => m.role === role);

  return (
    <DashboardLayout title="Team" subtitle="Manage team members & access roles">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Members", value: team.length, icon: Users2 },
          { label: "Owners", value: groupedByRole("owner").length, icon: Crown },
          { label: "Managers", value: groupedByRole("manager").length, icon: Shield },
          { label: "Staff", value: groupedByRole("staff").length, icon: User },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="p-4 rounded-2xl bg-card border">
            <div className="flex items-center gap-2 mb-1">
              <stat.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Team List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-lg">Team Members</h3>
            <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <UserPlus className="w-4 h-4" /> Invite
            </button>
          </div>

          {/* Invite form */}
          <AnimatePresence>
            {showInvite && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 mb-3">
                  <h4 className="font-medium mb-3">Invite Team Member</h4>
                  <div className="grid sm:grid-cols-3 gap-3 mb-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                      <input value={inviteForm.email} onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} placeholder="email@company.com" className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Role</label>
                      <div className="flex gap-1">
                        {(["manager", "staff"] as Role[]).map((r) => (
                          <button key={r} onClick={() => setInviteForm({ ...inviteForm, role: r })} className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${inviteForm.role === r ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"}`}>
                            {r.charAt(0).toUpperCase() + r.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Location</label>
                      <select value={inviteForm.location} onChange={(e) => setInviteForm({ ...inviteForm, location: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-muted/50 border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Downtown</option>
                        <option>Midtown</option>
                        <option>Brooklyn</option>
                        <option>All Locations</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setShowInvite(false)} className="px-4 py-2 rounded-xl bg-muted text-sm font-medium">Cancel</button>
                    <button onClick={handleInvite} disabled={!inviteForm.email} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50">Send Invite</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Members */}
          {team.map((member, i) => {
            const rc = roleConfig[member.role];
            const RoleIcon = rc.icon;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="p-4 rounded-2xl bg-card border hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{member.name}</span>
                      <span className={`flex items-center gap-1 text-[10px] font-medium ${rc.color}`}>
                        <RoleIcon className="w-3 h-3" /> {rc.label}
                      </span>
                      {member.status === "invited" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-aura-warning/10 text-aura-warning font-medium">Pending</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {member.email}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {member.location}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground hidden sm:block">{member.lastActive}</div>
                  {member.role !== "owner" && (
                    <button onClick={() => handleRemove(member.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Role Permissions sidebar */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-card border sticky top-8">
            <h3 className="font-display font-semibold mb-4">Role Permissions</h3>
            <div className="space-y-4">
              {(Object.keys(roleConfig) as Role[]).map((role) => {
                const rc = roleConfig[role];
                const RoleIcon = rc.icon;
                const isSelected = selectedRole === role;
                return (
                  <div key={role}>
                    <button onClick={() => setSelectedRole(isSelected ? null : role)} className={`w-full flex items-center gap-2 p-3 rounded-xl transition-colors ${isSelected ? "bg-primary/10" : "hover:bg-muted/50"}`}>
                      <RoleIcon className={`w-4 h-4 ${rc.color}`} />
                      <span className="text-sm font-medium">{rc.label}</span>
                      <ChevronRight className={`w-3 h-3 ml-auto transition-transform ${isSelected ? "rotate-90" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <ul className="pl-4 py-2 space-y-1.5">
                            {rolePermissions[role].map((p) => (
                              <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-primary shrink-0" /> {p}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border">
            <h3 className="font-display font-semibold mb-2">Plan Limits</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> <b>Free:</b> 1 user (owner only)</li>
              <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> <b>Pro:</b> Up to 3 team members</li>
              <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> <b>Premium:</b> Up to 10 team members</li>
              <li className="flex gap-2"><ChevronRight className="w-3 h-3 text-primary mt-0.5 shrink-0" /> <b>Enterprise:</b> Unlimited team members</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeamPage;
