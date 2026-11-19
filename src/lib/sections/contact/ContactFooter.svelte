<script lang="ts">
	import Icon from "$lib/components/Icon.svelte";
	import { santiagoProfile } from "$lib/data/portfolioData";
	import { magnetic } from "$lib/motion/magnetic";

	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(santiagoProfile.email);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2400);
		} catch {
			window.location.href = `mailto:${santiagoProfile.email}`;
		}
	}
</script>

<footer id="contacto" class="contact-footer">
	<div class="container footer-box">
		<div class="footer-copy">
			<span class="mono-label">Contacto directo</span>
			<h2 class="heading-lg footer-title">
				Hablemos de software, ciencia o <em class="serif-accent"
					>producto</em
				>
			</h2>
			<p class="footer-meta">
				{santiagoProfile.fullName} · {santiagoProfile.location} ·
				<a href="mailto:{santiagoProfile.email}" class="inline-mail"
					>{santiagoProfile.email}</a
				>
			</p>
		</div>

		<div class="footer-actions">
			<button
				type="button"
				class="contact-pill"
				use:magnetic
				onclick={copyEmail}
			>
				<Icon name={copied ? "check" : "copy"} size={15} />
				<span>{copied ? "Correo copiado" : "Copiar correo"}</span>
			</button>

			<a
				class="contact-pill secondary"
				use:magnetic
				href="mailto:{santiagoProfile.email}"
			>
				<span>Enviar correo</span>
				<Icon name="arrow-right" size={15} />
			</a>

			<a
				class="contact-pill secondary"
				use:magnetic
				href={santiagoProfile.socials.github}
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>GitHub</span>
				<Icon name="arrow-up-right" size={15} />
			</a>

			<a
				class="contact-pill secondary"
				use:magnetic
				href={santiagoProfile.socials.tiktok}
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>TikTok ({santiagoProfile.tiktokHandle})</span>
				<Icon name="arrow-up-right" size={15} />
			</a>
		</div>
	</div>
</footer>

<style lang="scss">
	.contact-footer {
		position: relative;
		z-index: var(--z-base);
		padding-block: var(--section-pad-y);
		border-top: 1px solid var(--border-hairline);
		background: rgba(7, 11, 20, 0.65);

		@media (max-width: 780px) {
			padding-bottom: calc(var(--section-pad-y) + 5rem);
		}
	}

	.footer-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.footer-copy {
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}

	.footer-title {
		max-width: 24ch;
	}

	.footer-meta {
		color: var(--text-muted);
		font-size: 0.93rem;
	}

	.inline-mail {
		color: var(--text-secondary);
		text-decoration: underline;
		text-decoration-color: var(--border-strong);
		text-underline-offset: 4px;

		&:hover {
			color: var(--text-main);
		}
	}

	.footer-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;

		@media (max-width: 540px) {
			width: 100%;
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));

			.contact-pill {
				justify-content: center;
				padding-inline: 0.85rem;
			}
		}
	}

	.contact-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.48rem;
		padding: 0.78rem 1.25rem;
		border-radius: var(--radius-pill);
		background: var(--accent-mova);
		color: var(--text-main);
		font-weight: 600;
		font-size: 0.88rem;
		transition:
			background-color 0.25s ease,
			border-color 0.25s ease;

		&:hover {
			background: var(--accent-mova-light);
		}

		&.secondary {
			background: var(--surface-card);
			border: 1px solid var(--border-hairline);

			&:hover {
				background: var(--surface-hover);
				border-color: var(--border-active);
			}
		}
	}
</style>
