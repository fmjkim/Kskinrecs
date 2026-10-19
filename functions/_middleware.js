const CANONICAL_HOST = "kskinrecs.pages.dev";

export async function onRequest(context) {
	const url = new URL(context.request.url);
	const needsHostRedirect = url.hostname !== CANONICAL_HOST;
	const needsPathRedirect = url.pathname === "/index.html";

	if (needsHostRedirect || needsPathRedirect) {
		url.protocol = "https:";
		url.hostname = CANONICAL_HOST;
		url.port = "";
		if (needsPathRedirect) url.pathname = "/";
		return Response.redirect(url.toString(), 301);
	}

	return context.next();
}
