import { i as useActor, a4 as useQuery, a5 as useQueryClient, a6 as useMutation, k as createActor } from "./index-D4bjddjr.js";
function useVolunteers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVolunteers();
    },
    enabled: !!actor && !isFetching
  });
}
function useMyVolunteerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["myVolunteerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyVolunteerProfile();
    },
    enabled: !!actor && !isFetching
  });
}
function useSaveVolunteerProfile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("No actor");
      return actor.saveMyVolunteerProfile(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myVolunteerProfile"] });
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    }
  });
}
function useFilterVolunteersBySkills(skills) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers", "filtered", skills.join(",")],
    queryFn: async () => {
      if (!actor) return [];
      return actor.filterVolunteersBySkills(skills);
    },
    enabled: !!actor && !isFetching && skills.length > 0
  });
}
function useTopVolunteers(taskId, limit = 5n) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["volunteers", "top", taskId == null ? void 0 : taskId.toString()],
    queryFn: async () => {
      if (!actor || taskId === null) return [];
      return actor.getTopVolunteers(taskId, limit);
    },
    enabled: !!actor && !isFetching && taskId !== null
  });
}
function useDeactivateVolunteer() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      if (!actor) throw new Error("No actor");
      return actor.deactivateVolunteer(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    }
  });
}
export {
  useSaveVolunteerProfile as a,
  useTopVolunteers as b,
  useVolunteers as c,
  useFilterVolunteersBySkills as d,
  useDeactivateVolunteer as e,
  useMyVolunteerProfile as u
};
